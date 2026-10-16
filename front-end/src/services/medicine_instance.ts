import { ApiModule } from '../lib/rest'

export interface MedicineInstance {
  id: number
  medicineId: number
  ubsId: number
  amount: number
}

class Module extends ApiModule {
  protected route = '/api/medicines/instances'

  constructor() {
    super()
  }

  async list() {
    return await this.get(this.route)
  }

  async create(data: MedicineInstance) {
    return await this.post(this.route, data)
  }

  async update(id: number, data: MedicineInstance) {
    return await this.patch(`${this.route}/${id}`, data)
  }

  async remove(id: number) {
    return await this.delete(`${this.route}/${id}`)
  }
}

export const MedicineInstanceAPI = new Module()