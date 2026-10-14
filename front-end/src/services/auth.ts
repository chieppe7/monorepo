import { ApiModule } from "../lib/rest"

class Module extends ApiModule {
  protected route = '/api/auth'

  constructor () {
    super()
  }

  async login (email: string, pass: string) {
    return await this.post(this.route + '/login', { email, pass })
  }
  async register (email: string, name: string, pass: string, address: string) {
    const latitude = 0
    const longitude = 0
    return await this.post(this.route + '/register', { name, email, pass, address, latitude, longitude })
  }
  async createUser (email: string, name: string, pass: string, address: string, role: string) {
    const latitude = 0
    const longitude = 0
    return await this.post(this.route + '/createuser', { name, email, pass, address, latitude, longitude, role })
  }
}

export const AuthAPI = new Module()

