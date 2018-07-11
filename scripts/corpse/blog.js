function Blog(host)
{
  Corpse.call(this,host);

  this.start = function()
  {
    this.hd.innerHTML = "<a href='index.html'><img src='media/interface/logo.svg'/></a>";
    this.md.innerHTML = this.build();
  }

  this.build = function()
  {
    var cats = invoke.vessel.storage["blog"];
    var html = "";
    var sidebar_html = "";

    for(name in cats){
      var topics = cats[name];
      sidebar_html += `<ln class='topic'>${name}</ln>`
      for(id in topics){
        var entry = topics[id];
        html += "<h2 id='"+this.format_hash(id)+"'>"+id+"</h2>";
        sidebar_html += "<ln><a href='#"+this.format_hash(id)+"'>"+id+"</a></ln>"
        html += `<h3>${entry.LOCATION} — ${entry.DATE}</h3>`
        html += new Runic(entry.TEXT);
      }
    }

    return "<list class='sidebar'>"+sidebar_html+"</list>"+html;
  }

  this.format_hash = function(str)
  {
    return str.replace(/ /g,'_').toLowerCase();
  }
}

invoke.vessel.seal("corpse","blog");

