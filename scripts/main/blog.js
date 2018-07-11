function Blog()
{
  Invoke.call(this);
  
  this.requirements = {corpse:["blog"],dict:["knowledge","blog"]};

  this.name = "blog";
  this.corpse = null;

  this.start = function()
  {
    this.corpse = new Blog(this);
    this.corpse.install();
  }
}

invoke.seal("main","blog");