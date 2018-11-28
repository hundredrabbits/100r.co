'use strict'

function Manager (tables) {
  const Page = require('./page')

  this.pages = {}

  for (const parent in tables) {
    const table = tables[parent]
    this.pages[parent] = new Page(parent, tables, tables)
    for (const id in table) {
      const sub = table[id]
      if (this.pages[id]) { console.warn(`Re-declaring page #${id}!`); return }
      this.pages[id] = new Page(id, sub, tables, parent)
    }
  }
}

module.exports = Manager
