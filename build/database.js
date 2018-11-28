function Database(tables)
{
  const fs = require('fs')

  this.storage = {}

  for(const id in tables){
    const table = tables[id]
    readTable(table)
  }

  function readTable(name){
    const path = `./build/database/${name}.ndtl`
    fs.readFile(path, 'utf8', function (err, data) {
      if (err) throw err
      console.log(data)
    })
  }
}

module.exports = Database