function Timeline(memory)
{
  this.memory = memory;
  this.events = [];

  this.start = function()
  {
    this.add_events();
  }

  this.add_events = function()
  {
    for(date in this.memory.hash){
      this.events.push(new Event(date,this.memory.hash[date]))
    }
    console.info("Added "+this.events.length+" events.")
  }
}

invoke.vessel.seal("corpse","timeline");