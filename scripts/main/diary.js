function Diary()
{
  Invoke.call(this);
  
  this.requirements = {corpse:["diary"]};

  this.name = "diary";
  this.corpse = null;

  this.start = function()
  {
    this.corpse = new Diary(this);
    this.corpse.install();
  }
}

invoke.seal("main","diary");