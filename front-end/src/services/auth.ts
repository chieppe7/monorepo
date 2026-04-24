import { ApiModule } from "../lib/rest"

class Module extends ApiModule {
  protected route = '/api/auth'

  constructor () {
    super()
  }

  async login (user: string, pass: string) {
    return await this.post(this.route + '/login', { user, pass })
  }
}

export const AuthAPI = new Module()

