<template>
  <v-container
    fluid
    class="bg-primary fill-height fill-width white pa-12 gradient"
  >
    <v-card
      class="mx-auto"
      width="344"
    >
      <!-- <AuthLoginWidget @output="onLogin" /> -->
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
// import AuthLoginWidget from '../widgets/AuthLogin.widget.vue';
// import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';

const router = useRouter();

// function onLogin({ token }: { token: string }) {
//   useAuthStore().saveToken(router, token);
// }

</script>
<style scoped>

.gradient {
  background: linear-gradient(rgb(var(--v-theme-primary-lighten-1)), rgb(var(--v-theme-primary-darken-1)))
}

</style>