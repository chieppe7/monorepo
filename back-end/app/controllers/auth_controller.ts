import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    const { email, pass } = request.only(['email', 'pass'])

    const user = await User.findBy('email', email)

    if (!user || !(await hash.verify(user.pass, pass))) {
      return response.unauthorized({
        errors: {
          base: ['Credenciais inválidas'],
        },
      })
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      address: user.address,
      latitude: user.latitude,
      longitude: user.longitude,
    }
  }

  async register({ request, response }: HttpContext) {
    const { name, email, pass, address, latitude, longitude } = request.only([
      'name',
      'email',
      'pass',
      'address',
      'latitude',
      'longitude',
    ])

    if (await User.findBy('email', email)) {
      return response.conflict({
        errors: {
          email: ['Este e-mail já está cadastrado'],
        },
      })
    }

    const firstUser = (await User.query().count('* as total'))[0].$extras.total === 0

    const user = await User.create({
      name,
      email,
      pass: await hash.make(pass),
      role: firstUser ? 'admin' : 'user',
      address,
      latitude,
      longitude,
    })

    return response.created({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      address: user.address,
      latitude: user.latitude,
      longitude: user.longitude,
    })
  }

  async createUser({ request, response }: HttpContext) {
    const { name, email, pass, address, latitude, longitude, role } = request.only([
      'name',
      'email',
      'pass',
      'address',
      'latitude',
      'longitude',
      'role',
    ])

    if (await User.findBy('email', email)) {
      return response.conflict({
        errors: {
          email: ['Este e-mail já está cadastrado'],
        },
      })
    }

    const user = await User.create({
      name,
      email,
      pass: await hash.make(pass),
      role,
      address,
      latitude,
      longitude,
    })

    return response.created({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      address: user.address,
      latitude: user.latitude,
      longitude: user.longitude,
    })
  }
}
