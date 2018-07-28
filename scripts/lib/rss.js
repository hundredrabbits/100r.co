function Rss()
{
  this.show = function(html)
  {
    var blog = invoke.vessel.storage.blog.DIARY;
    var diaries = []
    for(var title in blog){
      var diary = blog[title];
      diaries.push({title:title.capitalize(),date:new Date(diary.DATE).toUTCString(),description:new Runic(diary.TEXT).parse()})
    }

    var html = this.render(diaries);
    var win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=640,height=480,top="+(screen.height-200)+",left="+(screen.width-640));
    win.document.body.innerHTML = `<pre>${html.to_entities()}</pre>`;
  }

  this.items = function(diaries)
  {
    var html = ""
    for(id in diaries){
      var diary = diaries[id];
      html += `
  <item>
    <title>${diary.title}</title>
    <link>https://100r.co/blog.html</link>
    <pubDate>${diary.date}</pubDate>
    <guid isPermaLink='false'>IV${id}</guid>
    <dc:creator><![CDATA[Rekka Bellum]]></dc:creator>
    <description>
      ${diary.description.to_rss()}
    </description>
  </item>
`
    }
    return html;
  }

  this.render = function(diaries)
  {
    return `
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">

<channel>
  <title>Hundred Rabbits — Journal</title>
  <link>https://100r.co/blog.html</link>
  <description>The Rabbits'Journal</description>
  <generator>Oscean - Riven</generator>
  ${this.items(diaries)}
</channel>

</rss>`
  }

  window.addEventListener("keyup",(e)=>{ this.key_up(e); })

  this.key_up = function(e)
  {
    if(e.key == "g" && e.ctrlKey){ rss.show(); }
  }
}

String.prototype.to_rss = function()
{
  return this.replace(/\</g,"&lt;").replace(/\>/g,"&gt;")
}

String.prototype.to_entities = function()
{
  return this.replace(/[\u00A0-\u9999<>\&]/gim, function(i) { return `&#${i.charCodeAt(0)}`; });
}