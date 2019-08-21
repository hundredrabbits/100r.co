
String.prototype.toCapitalCase = function () { return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase() }
String.prototype.toUrl = function () { return this.replace(/ /g, '_').replace(/\W/g, '').trim().toLowerCase() }

function Feed (id, table) {
  const runic = require('./lib/runic')
  const curlic = require('./lib/curlic')

  this.filename = id

  function parse (table) {
    const a = []
    for (var id in table) {
      a.push(format(id, table[id]))
    }
    return a
  }

  function format (id, entry) {
    if (!entry.SETTINGS.DATE) {
      console.warn('Missing Date for', id)
    }

    let parts = []
    for (const id in entry) {
      if (id === 'SETTINGS') { continue }
      parts = parts.concat(entry[id])
    }
    const description = runic(parts).replaceAll('../media/blog/','https://100r.co/media/blog/').toRss()

    return {
      title: id.toCapitalCase(),
      date: new Date(entry.SETTINGS.DATE).toUTCString(),
      description
    }
  }

  function _item (entry,id) {
    return `
  <item>
    <title>${entry.title}</title>
    <link>https://100r.co/blog.html</link>
    <pubDate>${entry.date}</pubDate>
    <guid isPermaLink='false'>${entry.title.toUrl()}</guid>
    <dc:creator><![CDATA[Rekka Bellum]]></dc:creator>
    <description>
      ${entry.description}
    </description>
  </item>
`
  }

  this.toHtml = function () {
    return `
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
<channel>
  <title>Hundred Rabbits — Journal</title>
  <link><![CDATA[https://100r.co/blog]]></link>
  <description>The Rabbits' Journal</description>
  <generator>Oscean - Riven</generator>
  ${parse(table).reduce((acc, val, key) => { return `${acc}${_item(val,key)}` }, '')}
</channel>
</rss>`.trim()
  }
}

String.prototype.toRss = function () {
  return this.replace(/&(?!\w*;)/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/\"/g, '&quot;').replace(/\'/g, '&apos;')
}

String.prototype.toEntities = function () { 
  return this.replace(/[\u00A0-\u9999<>\&]/gim, function (i) { return `&#${i.charCodeAt(0)}` }) 
}

String.prototype.toPath = function () {
  return this.toLowerCase().replace(/\+/g, '.').replace(/ /g, '.').replace(/[^0-9a-z\.\-\/]/gi, '').trim()
}

String.prototype.replaceAll = function (search, replacement) { 
  return `${this}`.split(search).join(replacement) 
}

module.exports = Feed
