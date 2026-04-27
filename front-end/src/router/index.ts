import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../pages/public/Consult.page.vue'),
        meta: {
          label: 'Consultas',
          menu: true,
          allow: true
        }
      },
      {
        path: 'admin/account',
        name: 'account',
        component: () => import('../pages/admin/Account.page.vue'),
        meta: {
          label: 'Configurações de Usuário',
          menu: true,
          allow: true
        }
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})