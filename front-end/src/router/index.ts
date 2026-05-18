import { createRouter, createWebHistory } from 'vue-router'
import { type UserData } from '../stores/auth'

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
          icon: 'mdi-magnify',
          menu: true,
          allow: () => true,
        }
      },
      // {
      //   path: 'admin/account',
      //   name: 'account',
      //   component: () => import('../pages/admin/Account.page.vue'),
      //   meta: {
      //     label: 'Configurações de Usuário',
      //     menu: true,
      //     allow: (user: UserData) => user?.role === 'admin'
      //   }
      // },
      {
        path: 'admin/medince',
        name: 'medicine',
        component: () => import('../pages/admin/Medicine.page.vue'),
        meta: {
          label: 'Controle de Medicamentos',
          icon: 'mdi-medication',
          menu: true,
          allow: (user: UserData) => user?.role === 'admin'
        }
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.afterEach((to) => {
  const page = to.meta?.label

  document.title = page
    ? `${page} | MedCamp`
    : 'MedCamp'
})