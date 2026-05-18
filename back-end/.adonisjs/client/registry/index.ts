/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.login': {
    methods: ["POST"],
    pattern: '/api/auth/login',
    tokens: [{"old":"/api/auth/login","type":0,"val":"api","end":""},{"old":"/api/auth/login","type":0,"val":"auth","end":""},{"old":"/api/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'medicine.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/medicines',
    tokens: [{"old":"/api/medicines","type":0,"val":"api","end":""},{"old":"/api/medicines","type":0,"val":"medicines","end":""}],
    types: placeholder as Registry['medicine.index']['types'],
  },
  'medicine.store': {
    methods: ["POST"],
    pattern: '/api/medicines',
    tokens: [{"old":"/api/medicines","type":0,"val":"api","end":""},{"old":"/api/medicines","type":0,"val":"medicines","end":""}],
    types: placeholder as Registry['medicine.store']['types'],
  },
  'medicine.update': {
    methods: ["PATCH"],
    pattern: '/api/medicines/:id',
    tokens: [{"old":"/api/medicines/:id","type":0,"val":"api","end":""},{"old":"/api/medicines/:id","type":0,"val":"medicines","end":""},{"old":"/api/medicines/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['medicine.update']['types'],
  },
  'medicine.destroy': {
    methods: ["DELETE"],
    pattern: '/api/medicines/:id',
    tokens: [{"old":"/api/medicines/:id","type":0,"val":"api","end":""},{"old":"/api/medicines/:id","type":0,"val":"medicines","end":""},{"old":"/api/medicines/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['medicine.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
