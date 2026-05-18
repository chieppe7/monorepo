<script setup lang="ts">
import { ref } from 'vue'
import { AuthAPI } from '../../services/auth'
import { authStore } from '../../stores/auth'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const user = ref('')
const password = ref('')
const loading = ref(false)

const submit = async () => {
  loading.value = true

  try {
    const res = await AuthAPI.login(user.value, password.value)

    const data = {
      name: res.userName,
      role: res.userRole
    }

    if (data) {
      authStore.login(data)
    }

  } finally {
    loading.value = false
    emit('update:modelValue', false)
  }
}
</script>

<template>
  <v-dialog :model-value="props.modelValue">
    <v-card>
      <v-card-title>Login</v-card-title>

      <v-card-text>
        <v-text-field v-model="user" label="Usuário" />
        <v-text-field v-model="password" label="Senha" type="password" />
      </v-card-text>

      <v-card-actions>
        <v-btn :loading="loading" @click="submit">
          Entrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>