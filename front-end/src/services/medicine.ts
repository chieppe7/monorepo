import { ApiModule } from '../lib/rest'

export interface Medicine {
  id: number
  name: string
  dosage: string
  amount: number
  manufacturer: string
}

class Module extends ApiModule {
  protected route = '/api/medicines'

  constructor() {
    super()
  }

  async list() {
    return await this.get(this.route)
  }

  async create(data: Medicine) {
    return await this.post(this.route, data)
  }

  async update(id: number, data: Medicine) {
    return await this.patch(`${this.route}/${id}`, data)
  }

  async remove(id: number) {
    return await this.delete(`${this.route}/${id}`)
  }
}

export const MedicineAPI = new Module()