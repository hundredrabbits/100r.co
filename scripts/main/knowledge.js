function Knowledge()
{
  Invoke.call(this);
  
  this.requirements = {corpse:["knowledgebase"],dict:["knowledge"]};

  this.name = "knowledge";
  this.corpse = null;

  this.start = function()
  {
    this.corpse = new KnowledgeBase(this);
    this.corpse.install();
  }
}

invoke.seal("main","knowledge");