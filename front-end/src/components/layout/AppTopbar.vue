<script setup lang="ts">
import { computed, ref } from 'vue'
import LoginModal from '../modal/Login.modal.vue'
import { authStore } from '../../stores/auth';
import { useRoute } from 'vue-router'

const open = ref(false)
const route = useRoute()

const pageTitle = computed(() => {
  return route.meta?.label ?? ''
})

</script>

<template>
  <v-app-bar app class="border-b">
    <div class="d-flex align-center w-100 px-4">

      <div class="text-h6 font-weight-medium ml-3">
        {{ pageTitle }}
      </div>

      <v-spacer />

      <v-btn
        v-if="authStore.user === null"
        prepend-icon="mdi-login"
        variant="text"
        @click="open = true"
      >
        Entrar
      </v-btn>

      <LoginModal v-model="open" />
    </div>
  </v-app-bar>
</template>