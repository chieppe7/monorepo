<script setup lang="ts">
import { computed, ref } from 'vue'
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

const rail = ref(true)

function toggleRail() {
  rail.value = !rail.value
}
</script>

<template>
  <v-navigation-drawer
    :rail="rail"
    permanent
    width="260"
    rail-width="72"
  >
    <div class="d-flex flex-column h-100">

      <v-list class="py-2">
        <v-list-item
          @click="toggleRail"
          density="comfortable"
          class="py-3"
        >
          <template #prepend>
            <v-icon color="primary">
              mdi-hospital-building
            </v-icon>
          </template>

          <v-list-item-title v-if="!rail">
            MedCamp
          </v-list-item-title>
        </v-list-item>

        <v-divider class="my-2" />
      </v-list>

      <v-list>
        <v-list-item
          v-for="item in menu"
          :key="item.path"
          :title="item.meta!.label"
          :prepend-icon="item.meta!.icon"
          @click="router.push('/' + item.path)"
        />
      </v-list>

      <v-spacer />

      <v-list>
        <v-list-item
          title="Sair"
          prepend-icon="mdi-logout"
          @click="authStore.logout()"
        />
      </v-list>

    </div>
  </v-navigation-drawer>
</template>