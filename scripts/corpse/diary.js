function Diary(host)
{
  Corpse.call(this,host);

  this.start = function()
  {
    this.hd.innerHTML = "Hello"
  }
}

invoke.vessel.seal("corpse","diary");

