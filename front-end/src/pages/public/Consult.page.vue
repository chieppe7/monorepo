<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { MedicineAPI, type Medicine } from '../../services/medicine'
import {
  MedicineInstanceAPI,
  type MedicineInstance,
} from '../../services/medicine_instance'
import { UBSAPI, type UBS } from '../../services/ubs'
import { authStore } from '../../stores/auth'

interface ConsultResult {
  id: number
  medicine_name: string
  manufacturer: string
  dosage: string
  ubs_name: string
  ubs_address: string
  amount: number
  distance: number | null
}

const loading = ref(false)
const search = ref('')
const results = ref<ConsultResult[]>([])

const medicines = ref<Medicine[]>([])
const instances = ref<MedicineInstance[]>([])
const ubsList = ref<UBS[]>([])

const selectedMedicine = ref<string | null>(null)

async function loadData() {
  loading.value = true

  try {
    const [medicineData, instanceData, ubsData] = await Promise.all([
      MedicineAPI.list(),
      MedicineInstanceAPI.list(),
      UBSAPI.list(),
    ])

    medicines.value = medicineData
    instances.value = instanceData
    ubsList.value = ubsData

    await updateResults()
  } catch (error) {
    console.error('Failed to load consult data:', error)
  } finally {
    loading.value = false
  }
}

async function getDistances(
  latitude: number,
  longitude: number,
  facilities: UBS[],
): Promise<Map<number, number>> {
  const distances = new Map<number, number>()

  if (!facilities.length) return distances

  const coordinates = [
    `${longitude},${latitude}`,
    ...facilities.map(ubs =>
      `${Number(ubs.longitude)},${Number(ubs.latitude)}`
    ),
  ].join(';')

  const destinations = facilities.map((_, index) => index + 1).join(';')

  const url =
    `https://router.project-osrm.org/table/v1/driving/${coordinates}` +
    `?sources=0&destinations=${destinations}&annotations=distance`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`OSRM request failed: ${response.status}`)
  }

  const data = await response.json()

  facilities.forEach((ubs, index) => {
    const distance = data.distances?.[0]?.[index]

    if (typeof distance === 'number') {
      distances.set(ubs.id, distance)
    }
  })

  return distances
}

async function updateResults() {
  const term = search.value.trim().toLowerCase()

  const matchingMedicines = medicines.value.filter(m =>
    `${m.name} ${m.dosage} ${m.manufacturer}`
      .toLowerCase()
      .includes(term)
  )

  const medicineIds = new Set(matchingMedicines.map(m => m.id))

  const availableInstances = instances.value.filter(instance =>
    medicineIds.has(instance.medicineId) &&
    Number(instance.amount) > 0
  )

  const matchingUbsIds = new Set(
    availableInstances.map(instance => instance.ubsId)
  )

  const matchingUbs = ubsList.value.filter(ubs =>
    matchingUbsIds.has(ubs.id)
  )

  let distances = new Map<number, number>()

  const user = authStore.user
  const latitude = Number(user?.latitude)
  const longitude = Number(user?.longitude)

  if (
    user &&
    Number.isFinite(latitude) &&
    Number.isFinite(longitude)
  ) {
    try {
      distances = await getDistances(
        latitude,
        longitude,
        matchingUbs
      )
    } catch (error) {
      console.error('OSRM distance calculation failed:', error)
    }
  }

  results.value = availableInstances.map(instance => {
    const medicine = medicines.value.find(
      m => m.id === instance.medicineId
    )

    const ubs = ubsList.value.find(
      u => u.id === instance.ubsId
    )

    return {
      id: instance.id,
      medicine_name: medicine?.name ?? 'Medicamento desconhecido',
      manufacturer: medicine?.manufacturer ?? '',
      dosage: medicine?.dosage ?? '',
      ubs_name: ubs?.name ?? 'UBS desconhecida',
      ubs_address: ubs?.address ?? '',
      amount: Number(instance.amount),
      distance: distances.get(instance.ubsId) ?? null,
    }
  })

  if (distances.size > 0) {
    results.value.sort((a, b) => {
      if (a.distance === null) return 1
      if (b.distance === null) return -1
      return a.distance - b.distance
    })
  }
}

const suggestions = computed(() =>
  medicines.value.map(m => ({
    title: `${m.name} - ${m.dosage}`,
    value: m.name,
  }))
)

const filteredResults = computed(() => {
  const term = (
    selectedMedicine.value || search.value
  ).trim().toLowerCase()

  if (!term) return results.value

  return results.value.filter(result =>
    `${result.medicine_name} ${result.manufacturer} ${result.dosage}`
      .toLowerCase()
      .includes(term)
  )
})

function formatDistance(distance: number | null) {
  if (distance === null) return '—'

  if (distance < 1000) {
    return `${Math.round(distance)} m`
  }

  return `${(distance / 1000).toFixed(1)} km`
}

const showDistance = computed(() => {
  const user = authStore.user

  return (
    user !== null &&
    Number.isFinite(Number(user.latitude)) &&
    Number.isFinite(Number(user.longitude))
  )
})

const headers = computed(() => {
  const base = [
    { title: 'Medicamento', key: 'medicine_name' },
    { title: 'Fabricante', key: 'manufacturer' },
    { title: 'Dosagem', key: 'dosage' },
    { title: 'UBS', key: 'ubs_name' },
    { title: 'Endereço', key: 'ubs_address' },
    { title: 'Quantidade', key: 'amount' },
  ]

  if (showDistance.value) {
    base.push({ title: 'Distância', key: 'distance' })
  }

  return base
})

// watch(search, () => {
//   updateResults()
// })

watch(
  () => authStore.user,
  () => {
    updateResults()
  }
)

onMounted(loadData)
</script>

<template>
  <v-container fluid>
    <v-autocomplete
      v-model="selectedMedicine"
      v-model:search="search"
      :items="suggestions"
      label="Pesquisar medicamento"
      prepend-inner-icon="mdi-magnify"
      hide-details
      clearable
      density="comfortable"
      :loading="loading"
      no-filter
      @update:model-value="search = ''"
    />

    <v-card class="mt-4">
      <v-data-table
        :items="filteredResults"
        :headers="headers"
        :loading="loading"
        no-data-text="Nenhum medicamento disponível encontrado"
      >
        <template #item.distance="{ item }">
          {{ formatDistance(item.distance) }}
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<style scoped>
:deep(.v-data-table td:first-child),
:deep(.v-data-table th:first-child) {
  padding-left: 96px !important;
}

:deep(.v-data-table td:last-child),
:deep(.v-data-table th:last-child) {
  padding-right: 96px !important;
}
</style>