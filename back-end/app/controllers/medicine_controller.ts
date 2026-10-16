import type { HttpContext } from '@adonisjs/core/http'
import Medicine from '#models/medicine'
import MedicineInstance from '#models/medicine_instance'
import UBS from '#models/ubs'

export default class MedicineController {
  // ── Medicine CRUD ──────────────────────────

  async index() {
    return await Medicine.all()
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'dosage', 'manufacturer'])

    const medicine = await Medicine.create(data)

    return response.created({
      message: 'Medicamento criado',
      medicine,
    })
  }

  async update({ params, request, response }: HttpContext) {
    const medicine = await Medicine.find(params.id)

    if (!medicine) {
      return response.notFound({
        error: 'Medicamento não encontrado',
      })
    }

    const data = request.only(['name', 'dosage', 'manufacturer'])

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
      return response.notFound({
        error: 'Medicamento não encontrado',
      })
    }

    await medicine.delete()

    return {
      message: 'Medicamento removido',
    }
  }

  // ── Medicine Instance / Stock CRUD ─────────

  async indexInstances() {
    return await MedicineInstance.all()
  }

  async storeInstance({ request, response }: HttpContext) {
    const { medicine_id, ubs_id, amount } = request.only(['medicine_id', 'ubs_id', 'amount'])

    const existing = await MedicineInstance.query()
      .where('medicine_id', medicine_id)
      .where('ubs_id', ubs_id)
      .first()

    if (existing) {
      existing.amount = amount
      await existing.save()

      return {
        message: 'Estoque atualizado',
        instance: existing,
      }
    }

    const instance = await MedicineInstance.create({
      medicine_id,
      ubs_id,
      amount,
    })

    return response.created({
      message: 'Estoque cadastrado',
      instance,
    })
  }

  async updateInstance({ params, request, response }: HttpContext) {
    const instance = await MedicineInstance.find(params.id)

    if (!instance) {
      return response.notFound({
        error: 'Registro de estoque não encontrado',
      })
    }

    const data = request.only(['medicine_id', 'ubs_id', 'amount'])

    if (data.medicine_id !== undefined) {
      const medicine = await Medicine.find(data.medicine_id)

      if (!medicine) {
        return response.notFound({
          error: 'Medicamento não encontrado',
        })
      }
    }

    if (data.ubs_id !== undefined) {
      const ubs = await UBS.find(data.ubs_id)

      if (!ubs) {
        return response.notFound({
          error: 'UBS não encontrada',
        })
      }
    }

    instance.merge(data)
    await instance.save()

    return {
      message: 'Estoque atualizado',
      instance,
    }
  }

  async destroyInstance({ params, response }: HttpContext) {
    const instance = await MedicineInstance.find(params.id)

    if (!instance) {
      return response.notFound({
        error: 'Registro de estoque não encontrado',
      })
    }

    await instance.delete()

    return {
      message: 'Estoque removido',
    }
  }
}
