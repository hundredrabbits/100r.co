function Page (id, table, database, parent) {
  this.id = id.toLowerCase()
  this.dir = parent ? `${parent}` : ''
  this.filename = this.id.replace(/ /g, '_').replace(/\W/g, '').trim().toLowerCase()

  this.path = function () {
    return `./pages/${this.filename}.html`
  }

  this.toHtml = function () {
    return 'hey'
  }

  function makeFileName (str) {

  }
}

module.exports = Page
