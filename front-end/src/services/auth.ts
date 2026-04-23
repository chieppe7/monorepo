import { ApiModule } from "../lib/rest"

class Module extends ApiModule {
  protected route = '/api/login'

  constructor () {
    super()
  }

  async login (user: string, pass: string) {
    return await this.post(this.route, { user, pass })
  }
}

export const AuthAPI = new Module()

