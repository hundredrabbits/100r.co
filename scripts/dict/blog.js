var payload = new Indental(`
  
Diary
  Arriving in Savusavu
    Location : Savusavu, Fiji
    Date : 2012-02-03
    Text
      & Hey there

`).parse();

invoke.vessel.seal("dict","blog",payload);
