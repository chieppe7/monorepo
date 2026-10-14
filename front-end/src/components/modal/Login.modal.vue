<script setup lang="ts">
import { ref } from 'vue'
import { AuthAPI } from '../../services/auth'
import { authStore } from '../../stores/auth'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const email = ref('')
const password = ref('')
const loading = ref(false)

const error = ref<string | null>(null)

const submit = async () => {
  loading.value = true
  error.value = null

  try {
    const res = await AuthAPI.login(email.value, password.value)

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
    error.value =
      err?.response?.data?.errors?.base?.[0] ||
      'Erro ao fazer login'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-dialog
    :model-value="props.modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card>
      <v-card-title>Entrar</v-card-title>

      <v-card-text>
        <v-text-field v-model="email" label="Email" />
        <v-text-field v-model="password" label="Senha" type="password" />
        <v-alert
          v-if="error"
          type="error"
          density="compact"
          class="mb-3"
        >
          {{ error }}
        </v-alert>
      </v-card-text>

      <v-card-actions>
        <v-btn :loading="loading" @click="submit">
          Entrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>