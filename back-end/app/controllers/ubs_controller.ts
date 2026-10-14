import type { HttpContext } from '@adonisjs/core/http'
import UBS from '#models/ubs'

export default class UBSController {
  async index() {
    return await UBS.all()
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'address', 'latitude', 'longitude'])

    const ubs = await UBS.create(data)

    return response.created({
      message: 'UBS criada',
      ubs,
    })
  }

  async update({ params, request, response }: HttpContext) {
    const ubs = await UBS.find(params.id)

    if (!ubs) {
      return response.notFound({
        error: 'UBS não encontrada',
      })
    }

    const data = request.only(['name', 'address', 'latitude', 'longitude'])

    ubs.merge(data)
    await ubs.save()

    return {
      message: 'UBS atualizada',
      ubs,
    }
  }

  async destroy({ params, response }: HttpContext) {
    const ubs = await UBS.find(params.id)

    if (!ubs) {
      return response.notFound({
        error: 'UBS não encontrada',
      })
    }

    await ubs.delete()

    return {
      message: 'UBS removida',
    }
  }
}
