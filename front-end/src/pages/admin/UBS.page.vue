<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { UBSAPI, type UBS } from '../../services/ubs'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const ubs = ref([])

async function loadUBS() {
  ubs.value = await UBSAPI.list()
}

onMounted(() => {
  loadUBS()
  if (dialog.value) {
    initializeMap()
  }
})

const search = ref('')
const searching = ref(false)
const addressError = ref<string | null>(null)
const mapElement = ref<HTMLElement | null>(null)
const dialog = ref(false)

let map: L.Map | null = null
let marker: L.Marker | null = null

const editedUBS = ref<UBS>({
  id: 0,
  name: '',
  address: '',
  latitude: 0,
  longitude: 0,
})

const headers = [
  { title: '', key: 'actions', sortable: false, width: 70, align: 'center' },
  { title: 'Nome', key: 'name' },
  { title: 'Endereço', key: 'address' },
]

const filteredUBS = computed(() => {
  const term = search.value.toLowerCase()

  return ubs.value.filter(m =>
    m.name.toLowerCase().includes(term) ||
    m.address.toLowerCase().includes(term)
  )
})

function newUBS() {
  editedUBS.value = {
    id: 0,
    name: '',
    address: '',
    latitude: 0,
    longitude: 0,
  }

  dialog.value = true
}

function editUBS(item: UBS) {
  editedUBS.value = { ...item }
  dialog.value = true
}

async function saveUBS() {
  if (editedUBS.value.id) {
    await UBSAPI.update(
      editedUBS.value.id,
      editedUBS.value
    )
  } else {
    await UBSAPI.create(editedUBS.value)
  }

  await loadUBS()

  dialog.value = false
}

async function deleteUBS(id: number) {
  await UBSAPI.remove(id)

  await loadUBS()
}

const initializeMap = async () => {
  await nextTick()

  if (!mapElement.value || map) return

  map = L.map(mapElement.value).setView([-15.78, -47.93], 4)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)
}

const setMarker = (lat: number, lng: number) => {
  if (!map) return

  editedUBS.value.latitude = lat
  editedUBS.value.longitude = lng

  if (!marker) {
    marker = L.marker([lat, lng], { draggable: true }).addTo(map)

    marker.on('dragend', () => {
      const position = marker!.getLatLng()
      editedUBS.value.latitude = position.lat
      editedUBS.value.longitude = position.lng
    })
  } else {
    marker.setLatLng([lat, lng])
  }

  map.setView([lat, lng], 16)
}

const findAddress = async () => {
  addressError.value = null

  if (!editedUBS.value.address.trim()) {
    addressError.value = 'Digite um endereço'
    return
  }

  searching.value = true

  try {
    const params = new URLSearchParams({
      q: editedUBS.value.address,
      format: 'jsonv2',
      limit: '1',
    })

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?${params}`,
    )

    if (!response.ok) {
      throw new Error('Falha ao buscar endereço')
    }

    const results = await response.json()

    if (!results.length) {
      addressError.value = 'Endereço não encontrado'
      return
    }

    const lat = Number(results[0].lat)
    const lng = Number(results[0].lon)

    await initializeMap()
    setMarker(lat, lng)
    map?.invalidateSize()
  } catch {
    addressError.value = 'Erro ao buscar endereço'
  } finally {
    searching.value = false
  }
}

watch(
  () => dialog.value,
  async (isOpen) => {
    if (isOpen) {
      await initializeMap()
      map?.invalidateSize()
    }
  },
)

onBeforeUnmount(() => {
  map?.remove()
  map = null
  marker = null
})

</script>

<template>
  <v-container fluid>
    <div class="d-flex align-center mb-4">
      <v-text-field
        v-model="search"
        label="Pesquisar UBS"
        prepend-inner-icon="mdi-magnify"
        hide-details
        density="comfortable"
        class="mr-4"
      />

      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        @click="newUBS"
      >
        Nova UBS
      </v-btn>
    </div>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="filteredUBS"
      >
        <template #header.actions>
          <v-tooltip text="Ações">
            <template #activator="{ props }">
              <v-icon v-bind="props" size="18">mdi-square-edit-outline</v-icon>
            </template>
          </v-tooltip>
        </template>
         <template #item.actions="{ item }">
            <v-menu>
              <template #activator="{ props }">
                <v-btn
                  icon="mdi-dots-vertical"
                  variant="text"
                  v-bind="props"
                />
              </template>

              <v-list>
                <v-list-item @click="editUBS(item)">
                  <v-list-item-title>Editar</v-list-item-title>
                </v-list-item>

                <v-list-item @click="deleteUBS(item.id)">
                  <v-list-item-title>Excluir</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog
      v-model="dialog"
      max-width="500"
    >
      <v-card>
        <v-card-title>
          {{
            editedUBS.id
              ? 'Editar UBS'
              : 'Nova UBS'
          }}
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="editedUBS.name"
            label="Nome"
          />

          <v-text-field
          v-model="editedUBS.address"
          label="Endereço"
          :error-messages="addressError"
        />

        <v-btn
          class="mb-3"
          :loading="searching"
          @click="findAddress"
        >
          Encontrar endereço
        </v-btn>

        <div
          ref="mapElement"
          style="height: 300px; width: 100%;"
        />

        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            variant="text"
            @click="dialog = false"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="primary"
            @click="saveUBS"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>