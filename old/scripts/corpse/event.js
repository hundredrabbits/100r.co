function Event (date, data) {
  this.el = document.createElement('event')
  this.el.className = data.TYPE

  this.date = date
  this.data = data
  this.type = data.TYPE
  this.name = data.NAME
  this.text = data.TEXT
  this.link = data.LINK
  this.vlue = data.VLUE
  this.posi = data.POSI

  this.el.innerHTML = ''
  this.el.innerHTML += this.type == 'video' || this.type == 'release' ? `<a href='` + this.link + `' target='_blank'><media style='background-image:url(media/content/event.` + (this.name ? this.name.replace(/ /g, '.').toLowerCase() : '') + `.jpg)'></media></a>` : ''
  this.el.innerHTML += "<text><span class='title'>" + (this.link ? "<a href='" + this.link + "'>" + this.name + '</a>' : this.name) + "</span><span class='details'>" + (this.text ? this.text : (this.vlue ? this.vlue : '')) + '</span></text>'
  this.el.innerHTML += `<svg class="icon"><circle cx="10.5" cy="10.5" r="3"></circle></svg><line class="spacer"></line>`
}

invoke.vessel.seal('corpse', 'event')
