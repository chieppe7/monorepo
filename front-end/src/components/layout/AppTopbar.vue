<script setup lang="ts">
import { ref } from 'vue'
import LoginModal from '../modal/Login.modal.vue'

const open = ref(false)

console.log('top')
</script>

<template>
  <v-app-bar>
    <v-btn @click="open = true">
      Login
    </v-btn>

    <LoginModal v-model="open" />
  </v-app-bar>
</template>