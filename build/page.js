
String.prototype.toCapitalCase = function () { return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase() }
String.prototype.toUrl = function () { return this.trim().replace(/ /g, '_').replace(/\W/g, '').trim().toLowerCase() }

function Page (id, table, database, parent) {
  const runic = require('./lib/runic')
  const curlic = require('./lib/curlic')

  this.id = id.toLowerCase()
  this.parent = parent || 'home'
  this.filename = this.id.toUrl()

  this.path = function () {
    return `./pages/${this.filename}.html`
  }

  function _description () {
    return 'A digital studio aboard a sailboat.'
  }

  function _keywords () {
    let str = ''
    const db = database[parent]
    for (const id in db) {
      str += `${id}, `
    }
    str += Object.keys(table).join(', ').trim()
    return str.toLowerCase().trim()
  }

  function _main (data) {
    return `${runic(data, curlic)}`.trim()
  }

  function _list (name, data) {
    return `<ul>${Object.keys(data).reduce((acc, key, val) => { return key !== 'SETTINGS' ? `${acc}<li><a href='${!parent ? name.toUrl() + '.html#' + key.toUrl() : key.toUrl() + '.html'}'>${key.toCapitalCase()}</a></li>\n` : '' }, '')}</ul>\n`
  }

  function _jump (table) {
    return Object.keys(table).length >= 6 && parent ? `<ul class='jump'>${Object.keys(table).reduce((acc, key, val) => { return `${acc}<li><a href='#${key.toUrl()}'>${key.toCapitalCase()}</a></li>\n` }, '')}</ul>\n` : ''
  }

  function _template (acc, key) {
    if (key === 'SETTINGS') { return acc }
    if(id === 'games' || id === 'tools'){
      return `${acc}<a href='${parent ? '#' + key.toUrl() : key.toUrl() + '.html'}'><img src='../media/content/${id}/${key.toUrl()}/main.jpg'/></a>`
    }
    return `${acc}<h3 id='${key.toUrl()}'><a href='${parent ? '#' + key.toUrl() : key.toUrl() + '.html'}'>${key.toCapitalCase()}</a></h3>\n${Array.isArray(table[key]) ? _main(table[key]) : _list(key, table[key])}\n`
  }

  function _core (id, parent, content) {
    return `<h1>${id.toCapitalCase()}</h1>\n${_jump(table)}${Object.keys(table).reduce(_template, '')}\n`.trim()
  }

  function _navi (database) {
    const keys = Object.keys(database)
    return `<ul>${keys.reduce((acc, key) => {
      const keys = Object.keys(database[key])
      return `${acc}<li><a href='${key.toUrl()}.html'>${key}</a></li>\n<ul>${keys.reduce((acc, key) => { return `${acc}<li><a href='${key.toUrl()}.html'>${key.toCapitalCase()}</a></li>\n` }, '')}</ul>\n`
    }, '')
    }</ul>`.trim()
  }

  function _social () {
    return `
    <ul id='social'>
      <li><a href='https://twitter.com/hundredrabbits' class='twitter' target='_blank'></a></li>
      <li><a href='https://github.com/hundredrabbits' class='github' target='_blank'></a></li>
      <li><a href='https://patreon.com/100' class='patreon' target='_blank'></a></li>
    </ul>
    `
  }

  function _footer () {
    return `
    <p>Never miss an update</p>
    <form action="https://tinyletter.com/hundredrabbits" method="post" target="popupwindow" onsubmit="window.open('https://tinyletter.com/hundredrabbits', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true">
      <input type="email" value="" name="EMAIL" class="email" placeholder="email@address.com" required="">
      <input type="submit" value="Subscribe" name="subscribe" class="button">
    </form>`
  }

  this.toHtml = function () {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="author" content="Devine Lu Linvega, Rekka Bellum">
  <meta name='description' content='${_description()}'/>
  <meta name='keywords' content='${_keywords()}' />
  
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
    <a id='logo' href='https://100r.co'></a>
    <div id='core'>
      ${_core(this.id, this.parent)}
    </div>
    <div id='navi'>
      ${_navi(database)}
      ${_social()}
    </div>
    <div id='footer'>
      ${_footer()}
    </div>
  </div>
</body>
</html>`
  }
}

module.exports = Page
