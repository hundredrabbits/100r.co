
String.prototype.toCapitalCase = function () { return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase() }
String.prototype.toUrl = function () { return this.replace(/ /g, '_').replace(/\W/g, '').trim().toLowerCase() }

function Page (id, table, database, parent = 'home') {
  const runic = require('./lib/runic')
  const curlic = require('./lib/curlic')

  this.id = id.toLowerCase()
  this.parent = parent || 'home'
  this.filename = this.id.toUrl()

  this.path = function () {
    return `./pages/${this.filename}.html`
  }

  function _main (data) {
    return `${runic(data, curlic)}`
  }

  function _list (data) {
    return `<ul>${Object.keys(data).reduce((acc, key, val) => { return `${acc}<li><a href='/${key.toUrl()}'>${key.toCapitalCase()}</a></li>\n` }, '')}</ul>\n`
  }

  function _template (acc, key) {
    return `${acc}<h3>${key}</h3>\n${Array.isArray(table[key]) ? _main(table[key]) : _list(table[key])}\n`
  }

  function _body (id, parent, content) {
    return `<h1>${id}</h1>\n<h2>${parent}</h2>\n${Object.keys(table).reduce(_template, '')}\n`
  }

  this.toHtml = function () {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="author" content="Devine Lu Linvega">
  <meta name='description' content='The Nataniev Library(Static).'/>
  <meta name='keywords' content='Aliceffekt, Traumae, Devine Lu Linvega, Lietal, Oquonie, Verreciel, Nataniev, Oscean, Solarpunk' />
  <link rel="alternate"  type="application/rss+xml" title="Feed" href="links/rss.xml" />
  <title>Hundred Rabbits — ${this.id.toCapitalCase()}</title>
</head>
<body>
  ${_body(this.id, this.parent)}
</body>
</html>`
  }
}

module.exports = Page
