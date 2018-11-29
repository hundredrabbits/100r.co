'use strict'

function Database (tables) {
  const fs = require('fs')
  const indental = require('./lib/indental')

  this.storage = {}

  for (const id in tables) {
    const table = tables[id]
    const path = `./build/database/${table}.ndtl`
    const content = fs.readFileSync(path, 'utf8')
    this.storage[table] = indental(content)
    console.log(`Loaded ${table}.ndtl(${Object.keys(this.storage[table]).length} keys)`)
  }
}

module.exports = Database
