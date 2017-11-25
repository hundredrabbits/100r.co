function Layout(host)
{
  Corpse.call(this,host);

  this.timeline = document.createElement('c'); this.timeline.id = "timeline"; this.timeline.className = "timeline";

  this.drool = new Drool(false);

  this.start = function()
  {
    var sailed = 0;
    var spent  = 0;
    for(id in invoke.vessel.timeline.events){
      var event = invoke.vessel.timeline.events[id];
      if(event.type == "sail"){ sailed += parseFloat(event.vlue);}
      if(event.type == "expense"){ spent += parseFloat(event.vlue);}
    }

    this.hd.innerHTML = `
    <canvas id='logo' style='margin:10vh auto; display:block; width:300px; height:300px' width='600' height='600'></canvas>
    <c class="menu">
      <a href="https://hundredrabbits.itch.io" target="_blank">Games</a> 
      <a href="https://www.youtube.com/channel/UCzdg4pZb-viC3EdA1zxRl4A" target="_blank">Videos</a> 
      <a href="https://patreon.com/100" target="_blank">Support Us</a>
    </c>
    <c class="status">
      <w>
        <h2>Sailed `+parseInt(sailed * 1.852)+`km</h2> 
        <h2>Spent `+(spent * -1)+`$</h2>
        <hr>
      </w>
    </c>`
    
    for(id in invoke.vessel.timeline.events){
      var event = invoke.vessel.timeline.events[id];
      if(event.type != "video"){ continue; }
      this.timeline.appendChild(event.el)
    }

    this.md.appendChild(this.timeline)
    this.drool.install(document.getElementById("logo"),120);
  }

  this.load = function(key)
  {
  }
}

invoke.vessel.seal("corpse","layout");