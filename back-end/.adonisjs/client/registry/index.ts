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
  'auth.register': {
    methods: ["POST"],
    pattern: '/api/auth/register',
    tokens: [{"old":"/api/auth/register","type":0,"val":"api","end":""},{"old":"/api/auth/register","type":0,"val":"auth","end":""},{"old":"/api/auth/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.register']['types'],
  },
  'auth.create_user': {
    methods: ["POST"],
    pattern: '/api/auth/users',
    tokens: [{"old":"/api/auth/users","type":0,"val":"api","end":""},{"old":"/api/auth/users","type":0,"val":"auth","end":""},{"old":"/api/auth/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['auth.create_user']['types'],
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
  'medicine.index_instances': {
    methods: ["GET","HEAD"],
    pattern: '/api/medicines/instances',
    tokens: [{"old":"/api/medicines/instances","type":0,"val":"api","end":""},{"old":"/api/medicines/instances","type":0,"val":"medicines","end":""},{"old":"/api/medicines/instances","type":0,"val":"instances","end":""}],
    types: placeholder as Registry['medicine.index_instances']['types'],
  },
  'medicine.store_instance': {
    methods: ["POST"],
    pattern: '/api/medicines/instances',
    tokens: [{"old":"/api/medicines/instances","type":0,"val":"api","end":""},{"old":"/api/medicines/instances","type":0,"val":"medicines","end":""},{"old":"/api/medicines/instances","type":0,"val":"instances","end":""}],
    types: placeholder as Registry['medicine.store_instance']['types'],
  },
  'medicine.update_instance': {
    methods: ["PATCH"],
    pattern: '/api/medicines/instances/:id',
    tokens: [{"old":"/api/medicines/instances/:id","type":0,"val":"api","end":""},{"old":"/api/medicines/instances/:id","type":0,"val":"medicines","end":""},{"old":"/api/medicines/instances/:id","type":0,"val":"instances","end":""},{"old":"/api/medicines/instances/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['medicine.update_instance']['types'],
  },
  'medicine.destroy_instance': {
    methods: ["DELETE"],
    pattern: '/api/medicines/instances/:id',
    tokens: [{"old":"/api/medicines/instances/:id","type":0,"val":"api","end":""},{"old":"/api/medicines/instances/:id","type":0,"val":"medicines","end":""},{"old":"/api/medicines/instances/:id","type":0,"val":"instances","end":""},{"old":"/api/medicines/instances/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['medicine.destroy_instance']['types'],
  },
  'ubs.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/ubs',
    tokens: [{"old":"/api/ubs","type":0,"val":"api","end":""},{"old":"/api/ubs","type":0,"val":"ubs","end":""}],
    types: placeholder as Registry['ubs.index']['types'],
  },
  'ubs.store': {
    methods: ["POST"],
    pattern: '/api/ubs',
    tokens: [{"old":"/api/ubs","type":0,"val":"api","end":""},{"old":"/api/ubs","type":0,"val":"ubs","end":""}],
    types: placeholder as Registry['ubs.store']['types'],
  },
  'ubs.update': {
    methods: ["PATCH"],
    pattern: '/api/ubs/:id',
    tokens: [{"old":"/api/ubs/:id","type":0,"val":"api","end":""},{"old":"/api/ubs/:id","type":0,"val":"ubs","end":""},{"old":"/api/ubs/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['ubs.update']['types'],
  },
  'ubs.destroy': {
    methods: ["DELETE"],
    pattern: '/api/ubs/:id',
    tokens: [{"old":"/api/ubs/:id","type":0,"val":"api","end":""},{"old":"/api/ubs/:id","type":0,"val":"ubs","end":""},{"old":"/api/ubs/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['ubs.destroy']['types'],
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
