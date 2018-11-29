
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
    return `${runic(data, curlic)}`.trim()
  }

  function _list (data) {
    return `<ul>${Object.keys(data).reduce((acc, key, val) => { return `${acc}<li><a href='${key.toUrl()}.html'>${key.toCapitalCase()}</a></li>\n` }, '')}</ul>\n`
  }

  function _template (acc, key) {
    return `${acc}<h3 id='${key.toUrl()}'><a href='#${key.toUrl()}'>${key.toCapitalCase()}</a></h3>\n${Array.isArray(table[key]) ? _main(table[key]) : _list(table[key])}\n`
  }

  function _core (id, parent, content) {
    return `<h1>${id.toCapitalCase()}</h1>\n<h2><a href='${parent.toUrl()}.html'>${parent.toCapitalCase()}</a></h2>\n${Object.keys(table).reduce(_template, '')}\n`.trim()
  }

  function _navi (database) {
    const keys = Object.keys(database)
    return `<ul>${keys.reduce((acc, key) => {
      const keys = Object.keys(database[key])
      return `${acc}<li><a href='${key.toUrl()}.html'>${key}</a></li>\n<ul>${keys.reduce((acc, key) => { return `${acc}<li><a href='${key.toUrl()}.html'>${key.toCapitalCase()}</a></li>\n` }, '')}</ul>\n`
    }, '')
    }</ul>`.trim()
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
  
  <title>Hundred Rabbits — ${this.id.toCapitalCase()}</title>

  <link rel="alternate"  type="application/rss+xml" title="Feed" href="../links/rss.xml" />
  <link rel="stylesheet" type="text/css" href="../links/reset.css"/>
  <link rel="stylesheet" type="text/css" href="../links/fonts.css"/>
  <link rel="stylesheet" type="text/css" href="../links/main.css"/>

  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-53987113-3"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-53987113-3');
  </script>

</head>
<body>
  <div id='wrapper'>
    <a id='logo' href='/index.html'></a>
    <div id='core'>
      ${_core(this.id, this.parent)}
    </div>
    <div id='navi'>
      ${_navi(database)}
    </div>
  </div>
</body>
</html>`
  }
}

module.exports = Page
