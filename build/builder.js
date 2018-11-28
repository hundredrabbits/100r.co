'use strict'

function Builder (pages) {
  const fs = require('fs')

  this.build = function () {
    console.log('Building..')
    for (const id in pages) {
      const page = pages[id]
      const path = `./pages/${page.filename}.html`
      console.log(`Building ${path}`)
      fs.writeFileSync(path, page.toHtml())
    }
  }
}

module.exports = Builder
