'use strict'

function Builder (pages) {
  const fs = require('fs')

  this.build = function () {
    console.log('Building..')
    for (const id in pages) {
      const page = pages[id]
      console.log(`Building ${page.path()}`)
      fs.writeFileSync(page.path(), page.toHtml())
    }
  }
}

module.exports = Builder
