function Runic(raw)
{
  this.raw = raw;

  this.runes = {
    "&":{tag:"p",class:""},
    "~":{tag:"list",sub:"ln",class:"parent",stash:true},
    "-":{tag:"list",sub:"ln",class:"",stash:true},
    "#":{tag:"code",sub:"ln",class:"",stash:true},
    "?":{tag:"note",class:""},
    ":":{tag:"info",class:""},
    "%":{glyph:"%"},
    "*":{tag:"h2",class:""},
    "=":{tag:"h3",class:""},
    "+":{tag:"hs",class:""},
    "|":{tag:"tr",sub:"td",class:"",rep:true},
    "»":{tag:"tr",sub:"th",class:"",rep:true},
    ">":{tag:"",class:""}
  }    

  this.markup = function(html)
  {
    html = html.replace(/{_/g,"<i>").replace(/_}/g,"</i>")
    html = html.replace(/{\*/g,"<b>").replace(/\*}/g,"</b>")
    html = html.replace(/{\#/g,"<code class='inline'>").replace(/\#}/g,"</code>")

    var parts = html.split("{{")
    for(id in parts){
      var part = parts[id].split("}}")[0];
      var target = part.indexOf("|") > -1 ? part.split("|")[1] : "/"+part;
      var name = part.indexOf("|") > -1 ? part.split("|")[0] : part;

      html = html.replace("{{"+part+"}}","<a href='"+target.replace(" ","+")+"' class='"+((target.indexOf("https:") > -1 || target.indexOf("http:") > -1 || target.indexOf("dat:") > -1) ? "external" : "local")+"'>"+name+"</a>")
    }

    return html;
  }

  this.parse = function(raw = this.raw)
  {
    if(!raw){ return ""; }

    var html = "";
    var lines = raw;
    var lines = !Array.isArray(raw) ? raw.split("\n") : raw;

    for(id in lines){
      var char = lines[id].substr(0,1).trim().toString()
      var rune = this.runes[lines[id].substr(0,1)];
      var trail = lines[id].substr(1,1);
      var line = this.markup(lines[id].substr(2));
      if(!line || line.trim() == ""){ continue; }
      if(!rune){ console.log("Unknown rune",rune); }
      if(trail != " "){ console.warn("Runic","Non-rune["+trail+"] at:"+id+"("+line+")"); continue; }
      if(char == "%"){ html += this.media(line); continue; }
      html += this.render(line,rune);
    }
    html += this.render();
    return html;
  }
  
  this.media = function(val)
  {
    var service = val.split(" ")[0];
    var id = val.split(" ")[1];

    if(service == "itchio"){ return `<iframe frameborder="0" src="https://itch.io/embed/${id}?link_color=000000" width="600" height="167"></iframe>`; }
    if(service == "bandcamp"){ return `<iframe style="border: 0; width: 600px; height: 274px;" src="https://bandcamp.com/EmbeddedPlayer/album=${id}/size=large/bgcol=ffffff/linkcol=333333/artwork=small/transparent=true/" seamless></iframe>`; }
    if(service == "youtube"){ return `<iframe width="100%" height="380" src="https://www.youtube.com/embed/${id}" style="max-width:700px" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`; }
    if(service == "custom"){ return `<iframe src='${id}' style='width:100%;height:350px;'></iframe>`; }
    return `<img src="media/${val.to_path()}">`
  }

  // Render

  this.stash = [];
  this.prev = null;

  this.render = function(line = "",rune = null)
  {
    // Append to Stash
    if(this.stash.length > 0){
      if(rune && this.stash[0].rune.tag == rune.tag && rune.stash){
        this.stash.push({line:line,rune:rune}); return "";
      }
      else{
        var print = this.pop_stash(); this.stash = []; return print+(rune ? "<"+rune.tag+" class='"+rune.class+"'>"+line+"</"+rune.tag+">" : "");
      }
    }
    // New Stash
    if(rune && rune.stash && this.stash.length == 0){
      this.stash.push({line:line,rune:rune}); return "";
    }
    // Default
    return rune ? (rune.tag ? "<"+rune.tag+" class='"+rune.class+"'>"+line+"</"+rune.tag+">" : line) : "";
  }

  this.pop_stash = function(stash = this.stash)
  {
    var html = ""
    for(id in stash){
      html += "<"+stash[0].rune.sub+" class='"+stash[id].rune.class+"'>"+stash[id].line+"</"+stash[0].rune.sub+">\n";
    }
    return "<"+stash[0].rune.tag+" class='"+stash[0].rune.class+"'>"+html+"</"+stash[0].rune.tag+">";
  }

  this.html = function()
  {
    return this.parse(this.raw);
  }

  this.toString = function()
  {
    return this.html();
  }
}

invoke.seal("core","runic");