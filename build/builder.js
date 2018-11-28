'use strict'

function Builder (pages) {
  const fs = require('fs')

  this.build = function () {
    for (const id in pages) {
      const page = pages[id]
      const path = `./blog/${page.id}.html`
      fs.writeFileSync(path, page.toHtml())
    }
  }
}

module.exports = Builder
