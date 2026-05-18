<script setup lang="ts">
import { computed } from 'vue'
import { routes } from '../../router'
import { useRouter } from 'vue-router'
import { authStore } from '../../stores/auth'

const router = useRouter()

const menu = computed(() =>
  (routes[0].children ?? []).filter(route => {
    if (!route.meta?.menu) return false

    const allow = route.meta?.allow

    // no allow function = visible
    if (!allow) return true

    return allow(authStore.user)
  })
)

</script>

<template>
  <v-navigation-drawer>
    <v-list>
      <v-list-item
        v-for="item in menu"
        :key="item.path"
        :title="item.meta!.label"
        @click="router.push('/' + item.path)"
      />
      <v-list-item
        title="Logout"
        @click="authStore.logout()"
      />
    </v-list>
  </v-navigation-drawer>
</template>