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
      <p>We have sailed <a id='show_map'>`+(km.toString().substr(0,2)+"'"+km.toString().substr(2,3))+`km</a> making tools and games aboard <a href='https://github.com/hundredrabbits/Pino/blob/master/README.md' target='_blank'>Pino</a>.</p>
    </c>

    <c class="menu">
      <a href="https://hundredrabbits.itch.io" target="_blank">Store</a> 
      <a href="https://www.youtube.com/channel/UCzdg4pZb-viC3EdA1zxRl4A" target="_blank">Videos</a>
      <a href="resources.html">Resources</a>
      <a id='toggle_about'>About</a>
      <a id='toggle_support'>Support Us</a>
      <a id='toggle_game'>Games</a>
    </c>

    <div id='game'>
      <h2>Our games</h2>
      <p>Selecting a game will take you to a microsite, containing additional information about each project. Each page also features a presskit.</p>
      <center>
        <a href='http://markl.100r.co' target='_blank'><img src="media/content/logo.markl.png"></a>
        <a href='http://oquonie.100r.co' target='_blank'><img src="media/content/logo.oquonie.png"></a>
        <a href='http://donsol.100r.co' target='_blank'><img src="media/content/logo.donsol.png"></a>
        <a href='https://hundredrabbits.itch.io/hiversaires' target='_blank'><img src="media/content/logo.hiversaires.png"></a>
        <a href='https://hundredrabbits.itch.io/paradise' target='_blank'><img src="media/content/logo.paradise.png"></a>
      </center>
    </div>

    <div id='about'>
      <img src="media/content/profile.about.jpg">
      <h2>The Rabbits</h2>
      <columns>
        <p>We are <b>Rekka</b> & <b>Devine</b>, two unlikely sailors. In January 2016 we left the cold of Montreal and moved west to British Columbia, there, we purchased our sailboat <a href='https://github.com/hundredrabbits/Pino/blob/master/README.md' target='_blank'>Pino</a>. Keep in mind, we were a pair of city kids with limited outdoor experience, and neither of us had ever stepped onto a sailboat before.</p>
        <p>So why a sailboat? In 2012 we moved to Japan, there, we worked on our first games Hiversaires and Oquonie (the latter was completed in Thailand). We love how those travel experiences impacted our projects. After we returned to Canada, we decided that traveling best fueled our work and so we looked at our options. Moving to a new country means selling all you have, we have done this countless times (and are tired of it). We had heard of people living on sailboats like SY <a href='https://www.youtube.com/watch?v=sF9TNM9R-iw'>Lizzy Belle</a> (David Wellsford), SY <a href='https://www.youtube.com/watch?v=CkaH_UUH0Ek'>Daphne</a> (Terese Carey) and SY <a href='https://www.youtube.com/channel/UCkYfFeySHGN4DPrOc9So7PA'>Karl</a> (Nike Steiger), and became obssessed with the idea. Lack of experience aside, we thought that being in a mobile studio would help us accomplish our desire to travel while having a stable home.</p> 
        <p>Since then, we have left Canada and have sailed down the american west coast and over to Mexico. After that, we made the big jump across the pacific to French Polynesia, and crossed the wondrous south pacific islands over to New Zealand. We have since left the lower latitudes and sailed up to Fiji (where we are currently) Our goal right now is to make it back to Japan with Pino. We have become true digital nomads, we share our experience in the form of monthly videos; all the while, creating art, tools, books and games.</p>
        <p>Our goal is to keep moving, while continuing to work on <a href="https://itch.io/c/248074/tools" target="_blank">cool stuff</a>.</p>        
      </columns>
      <img src="media/content/sailboat.boat.jpg">
      <p class='small'>Our <a href='https://github.com/hundredrabbits/Pino/blob/master/README.md' target='_blank'>sailboat</a> is a Yamaha33, a 1982 masthead sloop sailboat. 'Pino' is the name of an android in the anime Ergo Proxy.'Hundredrabbits' is inspired from an imaginary sailboat (also, frome Ergo proxy) named the 'centzon totochtin', or 'four hundred rabbits'.</p>
    </div>

    <div id='support'>
      <h2>The first studio on a sailboat</h2>
      <p>We never thought it was possible to have a studio on a sailboat, we have people like you to thank for that. Any subscriptions and donations helps us become less dependent on app sales, and allows us to invest more time in fine-tuning tools for you to use. All we want is for everyone to be able to create cool stuff, and to have access to free tools to do it.</p>

      <h2>Become a patron</h2>
      <p class='large'><a href="https://www.youtube.com/watch?v=wH-IDF809fQ" target="_blank">Patreon</a> help fund artists as they produce smaller works like music, art and tools.</p>
      <columns>
        <p>To give a donation, go to our <a href="https://patreon.com/100" target="_blank">Patreon page</a> and click on the <b>Become a patron</b> button. You have the option of choosing a reward (each tier has different rewards), and that's it!</p>
        <p>Your donations permits us to continue to produce open-source content. We believe that tools should always be free, your donations will help ensure this. Our games, while being paid games, are open source too and viewable on our <a href="https://github.com/hundredrabbits" target="_blank">github</a>.</p> 
        <p>Your support also goes into creating our <a href="https://www.youtube.com/channel/UCzdg4pZb-viC3EdA1zxRl4A" target="_blank">monthly videos</a> that go in depth on our projects, and life on a sailboat (that is free for everyone to watch). We have learned a lot from the shared experiences of others, we hope that our videos will have the same effect.</p>
        <p>All the money we get is re-invested back into the Hundredrabbits projects. With your support we can also pay for internet and for the inevitable - and incessant - upkeep of our devices (which often break at sea, and from continued use).</p> 
        <form action="https://patreon.com/100" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick">
        <input type="hidden" name="hosted_button_id" value="B7NZHUNK2WGNJ">
        <input type="submit" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" class='button' value='Become a Patron'>
      </form>
      <br>
        <p>Thank you for your support!<br/><b>Rekka & Devine</b></p>
      </columns>
      <h2>How else can I show my support?</h2>
      <p> If making a monthly donation doesn't work for you, but you still want to show your appreciation. You can make a one time donation on paypal.</p>
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick">
        <input type="hidden" name="hosted_button_id" value="B7NZHUNK2WGNJ">
        <input type="submit" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" class='button' value='Go to Paypal'>
      </form>
      <br>
      <p>Or you can go the cryptocurrency route.</p>
      <list>
        <ln><b>$ETH</b> 0x7a5f5d9B697F04f5deE82c81859F7cC4FDb6e990</ln>
        <ln><b>$BTC</b> 1NU2Pso6nYbRpCAftX3yqQW9w2NSUxzsNa</ln>
      </list>
  
    </div>`

    document.getElementById("toggle_about").addEventListener("click", this.toggle_about);
    document.getElementById("toggle_support").addEventListener("click", this.toggle_support);
    document.getElementById("toggle_game").addEventListener("click", this.toggle_game);
    document.getElementById("show_map").addEventListener("click", this.show_map);
  
    for(id in invoke.vessel.timeline.events){
      var event = invoke.vessel.timeline.events[id];
      // if(event.type != "video"){ continue; }
      this.timeline.appendChild(event.el)
    }

    this.md.appendChild(this.timeline)
    this.drool.install(document.getElementById("logo"),120);

    document.body.appendChild(this.map.el)

    if(window.location.hash == "#map"){
      this.show_map();
    }
  }

this.toggle_game = function(e)
  {
    document.getElementById("about").style.display = "none";
    document.getElementById("support").style.display = "none";
    document.getElementById("game").style.display = "block";
  }

  this.toggle_about = function(e)
  {
    document.getElementById("about").style.display = "block";
    document.getElementById("support").style.display = "none";
    document.getElementById("game").style.display = "none";
  }

  this.toggle_support = function(e)
  {
    document.getElementById("about").style.display = "none";
    document.getElementById("support").style.display = "block";
    document.getElementById("game").style.display = "none";
  }

  this.show_map = function(e)
  {
    window.location.hash = "#map"
    document.getElementById("about").style.display = "none";
    document.getElementById("support").style.display = "none";
    document.getElementById("game").style.display = "none";
    document.getElementById("hundredrabbits").style.display = "none";
  }

  this.load = function(key)
  {
  }
}

invoke.vessel.seal("corpse","layout");