function Layout(host)
{
  Corpse.call(this,host);

  this.timeline = document.createElement('c'); this.timeline.id = "timeline"; this.timeline.className = "timeline";

  this.drool = new Drool(false);
  this.map = new Google_Map();

  this.start = function()
  {
    var sailed = 0;
    var spent  = 0;
    for(id in invoke.vessel.timeline.events){
      var event = invoke.vessel.timeline.events[id];
      if(event.type == "sail"){ sailed += parseFloat(event.vlue);}
      if(event.type == "expense"){ spent += parseFloat(event.vlue);}
    }

    var km = parseInt(sailed * 1.852)

    this.hd.innerHTML = `
    <canvas id='logo' style='margin:10vh auto; display:block; width:300px; height:300px' width='600' height='600'></canvas>
    
    <c class='headline'>
      <h1>Hundred Rabbits</h1>
      <p>We have sailed `+(km.toString().substr(0,2)+"'"+km.toString().substr(2,3))+`km making tools and games aboard <a href='https://github.com/hundredrabbits/Pino/blob/master/README.md' target='_blank'>Pino</a>.</p>
    </c>
    <c class="menu">
      <a href="https://hundredrabbits.itch.io" target="_blank">Games</a> 
      <a href="https://www.youtube.com/channel/UCzdg4pZb-viC3EdA1zxRl4A" target="_blank">Videos</a> 
      <a id='toggle_about'>About</a> 
      <a id='toggle_support'>Support Us</a>
    </c>
    <div id='about'>
      <img src="media/content/profile.about.jpg">
      <h2>The Rabbits</h2>
      <columns>
        <p>We are <b>Rekka</b> & <b>Devine</b>, two unlikely sailors. In January 2016 we left the cold of Montreal and moved west to British Columbia, there, we purchased our sailboat <a href='https://github.com/hundredrabbits/Pino/blob/master/README.md' target='_blank'>Pino</a>. Keep in mind, we were a pair of city kids with limited outdoor experience, and neither of us had ever stepped onto a sailboat before.</p>
        <p>So why a sailboat? In 2012 we moved to Japan, there, where we worked on our first games Hiversaires and Oquonie (the latter was completed in Thailand). We love how those travel experiences impacted our projects. After we returned to Canada, we decided that traveling best fueled our work and so we looked at our options. Moving to a new country means selling all you have, we have done this countless times (and are tired of it). We had heard of people living on sailboats like SY <a href='https://www.youtube.com/watch?v=sF9TNM9R-iw'>Lizzy Belle</a> (David Wellsford), SY <a href='https://www.youtube.com/watch?v=CkaH_UUH0Ek'>Daphne</a> (Terese Carey) and SY <a href='https://www.youtube.com/channel/UCkYfFeySHGN4DPrOc9So7PA'>Karl</a> (Nike Steiger), and became obssessed with the idea. Lack of experience aside, we thought that being in a mobile studio would help us accomplish our desire to travel while having a stable home.</p> 
        <p>Since then, we have left Canada and have sailed down the american west coast and over to Mexico. After that, we made the big jump across the pacific to French Polynesia, and crossed the wondrous south pacific islands over to New Zealand (where we are currently). Our goal right now is to make it back to Japan with Pino. We have become true digital nomads, we share our experience in the form of monthly videos; all the while, creating art, tools, books and games.</p>
        <p>Our goal is to keep traveling, while continuing to work on <a href="https://itch.io/c/248074/tools" target="_blank">cool stuff</a>.</p>        
      </columns>
      <img src="media/content/sailboat.boat.jpg">
      <p class='small'>Our <a href='https://github.com/hundredrabbits/Pino/blob/master/README.md' target='_blank'>sailboat</a> is a Yamaha33, a 1982 masthead sloop sailboat. 'Pino' is the name of an android in the anime Ergo Proxy.'Hundredrabbits' is inspired from an imaginary sailboat (also, frome Ergo proxy) named the 'centzon totochtin', or 'four hundred rabbits'.</p>
    </div>

    <div id='support'>
      <h2>Become a patron of our floating studio</h2>
      <p class='large'><a href="https://www.youtube.com/watch?v=wH-IDF809fQ" target="_blank">Patreon</a> help fund artists as they produce smaller works like music, art and tools.</p>
      <columns>
        <p>To do this, go to our <a href="https://patreon.com/100" target="_blank">Patreon page</a> and click on the <b>Become a patron</b> button. You have the option of choosing a reward (each tier has different rewards), and that's it!</p>
        <p>Your donations permits us to continue to produce open-source content. We believe that tools should always be free, your donations will help ensure this. Our games, while being paid games, are open source too and viewable on our <a href="https://github.com/hundredrabbits" target="_blank">github</a>.</p> 
        <p>Your support also goes into creating our <a href="https://www.youtube.com/channel/UCzdg4pZb-viC3EdA1zxRl4A" target="_blank">monthly videos</a> that go in depth on our projects, and life on a sailboat (that is free for everyone to watch). We have learned a lot from the shared experiences of others, we hope that our videos will have the same effect.</p>
        <p>All the money we get is re-invested back into the Hundredrabbits projects. With your support we can also pay for internet and for the inevitable - and incessant - upkeep of our devices (which often break at sea, and from continued use).</p> 
        <p>Thank you for your support!<br /><b>Rekka & Devine</b></p>
      </columns>
      <h2>Alternative ways to Support Us</h2>
      <list>
        <ln><b>$ETH</b> 0x7a5f5d9B697F04f5deE82c81859F7cC4FDb6e990</ln>
        <ln><b>$BTC</b> 1NU2Pso6nYbRpCAftX3yqQW9w2NSUxzsNa</ln>
      </list>
      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" class='paypal'>
        <input type="hidden" name="cmd" value="_s-xclick">
        <input type="hidden" name="hosted_button_id" value="B7NZHUNK2WGNJ">
        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
        <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
      </form>
    </div>`

    document.getElementById("toggle_about").addEventListener("click", this.toggle_about);
    document.getElementById("toggle_support").addEventListener("click", this.toggle_support);
  
    for(id in invoke.vessel.timeline.events){
      var event = invoke.vessel.timeline.events[id];
      // if(event.type != "video"){ continue; }
      this.timeline.appendChild(event.el)
    }

    this.md.appendChild(this.timeline)
    this.drool.install(document.getElementById("logo"),120);

    document.body.appendChild(this.map.el)
  }

  this.toggle_about = function(e)
  {
    document.getElementById("about").style.display = "block";
    document.getElementById("support").style.display = "none";
  }

  this.toggle_support = function(e)
  {
    document.getElementById("about").style.display = "none";
    document.getElementById("support").style.display = "block";
  }

  this.load = function(key)
  {
  }
}

invoke.vessel.seal("corpse","layout");