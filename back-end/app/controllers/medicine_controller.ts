import type { HttpContext } from '@adonisjs/core/http'
import Medicine from '#models/medicine'

export default class MedicineController {
  async index() {
    return await Medicine.all()
  }

  async store({ request }: HttpContext) {
    const data = request.only(['name', 'dosage', 'amount', 'manufacturer'])

    const medicine = await Medicine.create(data)

    return {
      message: 'Medicamento criado',
      medicine,
    }
  }

  async update({ params, request, response }: HttpContext) {
    const medicine = await Medicine.find(params.id)

    if (!medicine) {
      return response.status(404).send({
        error: 'Medicamento não encontrado',
      })
    }

    const data = request.only(['name', 'dosage', 'amount', 'manufacturer'])

    medicine.merge(data)

    await medicine.save()

    return {
      message: 'Medicamento atualizado',
      medicine,
    }
  }

  async destroy({ params, response }: HttpContext) {
    const medicine = await Medicine.find(params.id)

    if (!medicine) {
      return response.status(404).send({
        error: 'Medicamento não encontrado',
      })
    }

    await medicine.delete()

    return {
      message: 'Medicamento removido',
    }
  }
}
