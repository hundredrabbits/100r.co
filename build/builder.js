'use strict'

function Builder (pages, feeds,database) {
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

    this.makeCategories()
  }


  this.makeCategories = () => {

    const runic = require('./lib/runic')
    const curlic = require('./lib/curlic')

    console.log('Now, categories.c')
    let code = ''
    const indexes = Object.keys(database.storage)

    for (const id of indexes) {
      const catIdsk = id.trim().replace(/\W/g, ' ').toLowerCase().replace(/ /g,'_')
      code += `Category ${id.trim().toLowerCase().replace(/ /g,'_')} = create_category("${id}");\n`
      for(const pageId in database.storage[id]){
        const page = database.storage[id][pageId]
        const pageIdsk = pageId.trim().replace(/\W/g, ' ').toLowerCase().replace(/ /g,'_')
        code += `Page ${pageIdsk} = create_page("${pageId.toLowerCase()}");\n`
        for(const partId in page){
          const partIdsk = partId.trim().replace(/\W/g, '').toLowerCase().replace(/ /g,'_')
          console.log(pageId, Object.keys(page[partId]))
          if(page[partId].LOCATION){
            code += '//'+page[partId].LOCATION+'\n';
          }else if(page[partId].DATE){
            code += '//'+page[partId].DATE+'\n';
          }
          else{
            code += `add_part(&${pageIdsk}, "${partId.toLowerCase()}", "${runic(page[partId], curlic).replace(/\"/g,"\'").replace(/class=\'\'/g,'').replace(/\<\p \>/g,'<p>')}");\n`            
          }
        }
        code += `add_page(&${catIdsk}, &${pageIdsk});\n`
        code += `\n`
      }
      code += `\n`
    }

    code += `Category *categories[] = {${indexes.map((item) => { return '&'+item}).join(', ').trim()}};`

    const path = `./src/categories.c`
    fs.writeFileSync(path, code)
  }
}

module.exports = Builder
