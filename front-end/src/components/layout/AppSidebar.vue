<script setup lang="ts">
import { routes } from '../../router'
import { useRouter } from 'vue-router'

const router = useRouter()

const menu = routes[0].children?.filter(r => r.meta?.menu) ?? []

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
    </v-list>
  </v-navigation-drawer>
</template>