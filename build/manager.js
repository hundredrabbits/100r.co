'use strict'

function Manager (tables) {
  const Page = require('./page')

  this.pages = {}

  for (const id in tables) {
    const table = tables[id]
    this.pages[id] = new Page(id, tables)
  }
}

module.exports = Manager
