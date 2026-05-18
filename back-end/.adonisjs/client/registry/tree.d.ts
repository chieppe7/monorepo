/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    login: typeof routes['auth.login']
  }
  medicine: {
    index: typeof routes['medicine.index']
    store: typeof routes['medicine.store']
    update: typeof routes['medicine.update']
    destroy: typeof routes['medicine.destroy']
  }
}
