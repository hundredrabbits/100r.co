function Layout(host)
{
  Corpse.call(this,host);
  
  // Header
  this.hd.appendChild(this.h1 = document.createElement('h1'));
  // Body
  this.md.appendChild(this.md_wr = document.createElement('wr'));
  // Footer
  this.fd.appendChild(this.fd_wr = document.createElement('wr'));

  this.start = function()
  {
    
  }

  this.load = function(key)
  {
  }
}

invoke.vessel.seal("corpse","layout");