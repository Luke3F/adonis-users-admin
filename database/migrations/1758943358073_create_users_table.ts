import { BaseSchema } from '@adonisjs/lucid/schema' // Základ databázových migrací

export default class extends BaseSchema {
  // Třída databázové migrace
  protected tableName = 'users' // Název tabulky

  async up() {
    // Vytvoření tabulky
    this.schema.createTable(this.tableName, (table) => {
      // Definice tabulky
      table.increments('id').notNullable() // Jedinečné ID uživatele
      table.string('full_name').nullable() // Jméno uživatele
      table.string('email', 254).notNullable().unique() // Unikátní e-mail
      table.string('password').notNullable() // Heslo uživatele
      table.string('role').notNullable().defaultTo('user') // Výchozí role uživatele

      table.timestamp('created_at').notNullable() // Datum vytvoření
      table.timestamp('updated_at').nullable() // Datum poslední úpravy
    })
  }

  async down() {
    // Vrácení migrace zpět
    this.schema.dropTable(this.tableName) // Odstranění tabulky
  }
}
