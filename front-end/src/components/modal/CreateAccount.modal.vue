<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { AuthAPI } from '../../services/auth'
import { authStore } from '../../stores/auth'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const email = ref('')
const name = ref('')
const address = ref('')
const password = ref('')
const latitude = ref<number>(0)
const longitude = ref<number>(0)
const loading = ref(false)
const searching = ref(false)
const error = ref<string | null>(null)
const addressError = ref<string | null>(null)

const mapElement = ref<HTMLElement | null>(null)

let map: L.Map | null = null
let marker: L.Marker | null = null

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

  latitude.value = lat
  longitude.value = lng

  if (!marker) {
    marker = L.marker([lat, lng], { draggable: true }).addTo(map)

    marker.on('dragend', () => {
      const position = marker!.getLatLng()
      latitude.value = position.lat
      longitude.value = position.lng
    })
  } else {
    marker.setLatLng([lat, lng])
  }

  map.setView([lat, lng], 16)
}

const findAddress = async () => {
  addressError.value = null

  if (!address.value.trim()) {
    addressError.value = 'Digite um endereço'
    return
  }

  searching.value = true

  try {
    const params = new URLSearchParams({
      q: address.value,
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

const submit = async () => {
  loading.value = true
  error.value = null

  try {
    const res = await AuthAPI.register(
      email.value,
      name.value,
      password.value,
      address.value,
      latitude.value,
      longitude.value,
    )

    authStore.login({
      email: res.email,
      name: res.name,
      role: res.role,
      address: res.address,
      latitude: res.latitude,
      longitude: res.longitude,
    })

    emit('update:modelValue', false)
  } catch (err: any) {
    console.log({err})
    error.value =
      err?.response?.data?.errors?.base?.[0] ||
      'Erro ao registrar usuário'
  } finally {
    loading.value = false
  }
}

watch(
  () => props.modelValue,
  async (isOpen) => {
    if (isOpen) {
      await initializeMap()
      map?.invalidateSize()
    }
  },
)

onMounted(() => {
  if (props.modelValue) {
    initializeMap()
  }
})

onBeforeUnmount(() => {
  map?.remove()
  map = null
  marker = null
})
</script>

<template>
  <v-dialog
    :model-value="props.modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    max-width="700"
  >
    <v-card>
      <v-card-title>Registrar Usuário</v-card-title>

      <v-card-text>
        <v-text-field v-model="email" label="Email" />
        <v-text-field v-model="name" label="Nome" />
        <v-text-field
          v-model="password"
          label="Senha"
          type="password"
        />

        <v-text-field
          v-model="address"
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

        <v-alert
          v-if="error"
          type="error"
          density="compact"
          class="mt-3"
        >
          {{ error }}
        </v-alert>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          :loading="loading"
          :disabled="latitude === null || longitude === null"
          @click="submit"
        >
          Registrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>