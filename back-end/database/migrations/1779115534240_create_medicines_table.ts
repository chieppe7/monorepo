import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'medicines'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').unique().notNullable()
      table.string('dosage').notNullable()
      table.string('manufacturer').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
