import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class MedicineInstance extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare medicine_id: number

  @column()
  declare ubs_id: number

  @column()
  declare amount: number
}
