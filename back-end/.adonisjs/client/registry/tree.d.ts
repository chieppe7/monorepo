/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    login: typeof routes['auth.login']
    register: typeof routes['auth.register']
    createUser: typeof routes['auth.create_user']
  }
  medicine: {
    index: typeof routes['medicine.index']
    store: typeof routes['medicine.store']
    update: typeof routes['medicine.update']
    destroy: typeof routes['medicine.destroy']
    indexInstances: typeof routes['medicine.index_instances']
    storeInstance: typeof routes['medicine.store_instance']
    updateInstance: typeof routes['medicine.update_instance']
    destroyInstance: typeof routes['medicine.destroy_instance']
  }
  ubs: {
    index: typeof routes['ubs.index']
    store: typeof routes['ubs.store']
    update: typeof routes['ubs.update']
    destroy: typeof routes['ubs.destroy']
  }
}
