// import type { HttpContext } from '@adonisjs/core/http'

import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    const { user, pass } = request.only(['user', 'pass'])

    let existingUser = await User.findBy('user', user)

    if (!existingUser) {
      const hashedPassword = await hash.make(pass)

      existingUser = await User.create({
        user: user,
        pass: hashedPassword,
      })

      return {
        message: 'Usuário criado',
        user: existingUser,
      }
    }

    const isValid = await hash.verify(existingUser.pass, pass)

    if (!isValid) {
      return response.status(401).send({
        errors: {
          base: ['Senha inválida'],
        },
      })
    }

    return {
      message: 'Login OK',
      user: existingUser,
    }
  }
}
