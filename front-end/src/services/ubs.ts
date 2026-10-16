import { ApiModule } from '../lib/rest'

export interface UBS {
  id: number
  name: string
  address: string
  latitude: number
  longitude: number
}

class Module extends ApiModule {
  protected route = '/api/ubs'

  constructor() {
    super()
  }

  async list() {
    return await this.get(this.route)
  }

  async create(data: UBS) {
    return await this.post(this.route, data)
  }

  async update(id: number, data: UBS) {
    return await this.patch(`${this.route}/${id}`, data)
  }

  async remove(id: number) {
    return await this.delete(`${this.route}/${id}`)
  }
}

export const UBSAPI = new Module()