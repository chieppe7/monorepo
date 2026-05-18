<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { MedicineAPI } from '../../services/medicine'

interface Medicine {
  id: number
  name: string
  manufacturer: string
  dosage: string
  amount: number
}

const loading = ref(false)

const medicines = ref<Medicine[]>([])

const search = ref('')

async function loadMedicines() {
  loading.value = true

  try {
    medicines.value = await MedicineAPI.list()
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadMedicines()
})

const suggestions = computed(() => {
  return medicines.value.map(m => ({
    title: `${m.name} - ${m.manufacturer}`,
    value: m.name
  }))
})

const filteredMedicines = computed(() => {
  const term = search.value.toLowerCase()

  if (!term) {
    return medicines.value
  }

  return medicines.value.filter(m =>
    m.name.toLowerCase().includes(term) ||
    m.manufacturer.toLowerCase().includes(term)
  )
})
</script>

<template>
  <v-container fluid>
    <v-autocomplete
      v-model:search="search"
      :items="suggestions"
      label="Pesquisar medicamento"
      prepend-inner-icon="mdi-magnify"
      hide-details
      clearable
      density="comfortable"
      :loading="loading"
    />

    <v-card class="mt-4 d-flex justify-center">
      <div class="w-100">
          <v-data-table
            :items="filteredMedicines"
            :headers="[
              { title: 'Nome', key: 'name' },
              { title: 'Fabricante', key: 'manufacturer' },
              { title: 'Dosagem', key: 'dosage' },
              { title: 'Quantidade', key: 'amount' }
            ]"
          />
        </div>  
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