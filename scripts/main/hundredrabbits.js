function Hundredrabbits()
{
  Invoke.call(this);
  
  this.requirements = {corpse:["layout","timeline","event","drool","map"],dict:["timeline"]};

  this.name = "hundredrabbits";
  this.corpse = null;

  this.start = function()
  {
    this.timeline = new Timeline($TIMELINE);
    this.timeline.start()
    this.corpse   = new Layout(this);
    this.corpse.install();
  }

  this.query = function()
  {
    var parts = window.location.pathname.split("/"); console.log(parts[parts.length-1])
    var hash = window.location.hash.replace("#","");
    return hash;
  }
}

function initMap()
{
  invoke.vessel.corpse.map.start(); 
}

invoke.seal("main","hundredrabbits");