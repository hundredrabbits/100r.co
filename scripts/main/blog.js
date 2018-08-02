function Blog()
{
  this.el = document.createElement('yu');
  this.el.id = "blog";

  this.el.appendChild(this.hd = document.createElement('yu')); this.hd.id = "hd";
  this.el.appendChild(this.sb = document.createElement('yu')); this.sb.id = "sb";
  this.el.appendChild(this.md = document.createElement('yu')); this.md.id = "md";
  this.el.appendChild(this.fd = document.createElement('yu')); this.fd.id = "fd";

  this.tables = {blog:db_blog,knowledge:db_knowledge,pages:db_pages}

  this.install = function(host)
  {
    host.appendChild(this.el)
  }

  this.start = function()
  {
    this.hd.innerHTML = "<a href='index.html'><img src='media/interface/logo.svg'/></a>";
    this.sb.innerHTML = this._sidebar();

    var target = window.location.hash.replace("#","").replace(/\+/g," ").trim();
    var blogs = Object.keys(this.tables.blog)
    var latest_blog = blogs[0]
    this.load(target ? target : latest_blog)
  }

  this.load = function(target)
  {
    var result = this.find(target);
    var entry = this.tables[result.id][result.name];

    window.location.hash = `${result.name.to_url()}`

    this.update(result,entry);
  }

  this.find = function(target)
  {
    for(id in this.tables){
      var table = this.tables[id]
      for(name in table){
        var category = table[name];
        if(target.toUpperCase() == name.toUpperCase()){
          return {id:id,name:name};
        }
      }
    }
    return null;
  }

  this.update = function(result,entry)
  {
    var html = `<h1>${result.name.capitalize()}</h1>`

    for(id in entry){
      var field = entry[id];
      html += `<h2 class='${id.toLowerCase()}'>${id.capitalize()}</h2>`
      html += `<div class='${id.toLowerCase()}'>${Array.isArray(field) ? new Runic(field).parse() : field}</div>`
    }

    this.md.innerHTML = `<article>${html}</article>`;
  }

  this._sidebar = function()
  {
    var html = "";

    for(id in this.tables){
      var table = this.tables[id]
      html += `<list class='table'>`
      html += `<ln class='head'>${id.capitalize()}</ln>`
      for(name in table){
        var category = table[name];
        html += `<ln>{{${name.capitalize()}}}</ln>`.to_markup()
      }
      html += '</list>'
    }
    return html;
  }

  this._diaries = function()
  {
    return ""
    var html = "";
    for(name in db_blog){
      var topics = db_blog[name];
      for(id in topics){
        var entry = topics[id];
        html += `
        <yu class='content'>
          <h2 id='${id.to_path()}'>${id}</h2>
          <h3>${entry.LOCATION} — ${entry.DATE}</h3>
          ${new Runic(entry.TEXT)}
        </yu>`
      }
    }
    return html;
  }

  this.build = function()
  {
    return `${this._sidebar()}`
  }
}
