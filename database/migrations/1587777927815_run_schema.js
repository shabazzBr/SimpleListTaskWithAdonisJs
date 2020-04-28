'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RunSchema extends Schema {
  up () {
    this.table('runs', (table) => {
      // alter table
    })
  }

  down () {
    this.table('runs', (table) => {
      // reverse alternations
    })
  }
}

module.exports = RunSchema
