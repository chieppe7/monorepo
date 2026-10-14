import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare email: string

  @column()
  declare pass: string

  @column()
  declare role: 'admin' | 'user'

  @column()
  declare address: string

  @column()
  declare latitude: number | null

  @column()
  declare longitude: number | null
}
