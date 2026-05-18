import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Medicine extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare dosage: string

  @column()
  declare amount: number

  @column()
  declare manufacturer: string
}
