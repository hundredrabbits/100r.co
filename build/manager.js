'use strict'

function Manager (tables) {
  const Page = require('./page')

  this.pages = {}

  for (const parent in tables) {
    const generics = tables
    const table = tables[parent]
    this.pages[parent] = new Page(parent, generics)
    for (const id in table) {
      const sub = table[id]
      if (this.pages[id]) { console.warn(`Re-declaring page #${id}!`); return }
      this.pages[id] = new Page(id, sub, generics, parent)
    }
  }
}

module.exports = Manager
