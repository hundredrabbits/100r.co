function Event(date,data)
{
  this.el = document.createElement('event'); 
  this.el.className = data.type;

  this.date = date;
  this.data = data;
  this.type = data.type;
  this.name = data.name;
  this.text = data.text;
  this.link = data.link;
  this.vlue = data.vlue;
  this.posi = data.posi;

  this.el.innerHTML = ""
  this.el.innerHTML += this.type == "video" ? `<a href='`+this.link+`' target='_blank'><media style='background-image:url(media/content/event.`+(this.name ? this.name.replace(/ /g,'.') : '')+`.jpg)'></media></a>` : ''
  this.el.innerHTML += "<text><span class='title'>"+this.name+"</span><span class='details'>"+(this.text ? this.text : (this.vlue ? this.vlue : ''))+"</span></text>"
  this.el.innerHTML += `<svg class="icon"><circle cx="10.5" cy="10.5" r="3"></circle></svg><line class="spacer"></line>`
}

invoke.vessel.seal("corpse","event");