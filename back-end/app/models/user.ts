import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user: string

  @column()
  declare pass: string

  @column()
  declare role: string
}
