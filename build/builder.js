'use strict'

function Builder (pages, feeds) {
  const fs = require('fs')

  this.build = function () {
    console.log('Building..')
    for (const id in pages) {
      const page = pages[id]
      const path = `./pages/${page.filename}.html`
      console.log(`Building ${path}`)
      fs.writeFileSync(path, page.toHtml())
    }
    for (const id in feeds) {
      const feed = feeds[id]
      const path = `./links/${feed.filename}.xml`
      console.log(`Building ${path}`)
      fs.writeFileSync(path, feed.toHtml())
    }
  }
}

module.exports = Builder
