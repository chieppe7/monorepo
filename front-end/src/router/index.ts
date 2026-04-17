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
      // {
      //   path: 'admin/crud',
      //   name: 'crud',
      //   component: () => import('../pages/admin/Crud.page.vue'),
      //   meta: {
      //     label: 'CRUD',
      //     menu: true,
      //     allow: true
      //   }
      // }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})