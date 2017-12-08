function Google_Map()
{
  var map;
  this.el = document.createElement('div'); this.el.id = "map";

  this.start = function()
  {
    var current_coord = {lat: -35.836830, lng: 174.468635};
    map = new google.maps.Map(document.getElementById('map'), { center: current_coord, zoom: 8, disableDefaultUI: true });

    map.set('styles', this.style);

    var path = new google.maps.Polyline({ path: this.path(), geodesic: true, strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 2 });
    path.setMap(map);

    this.add_marker("current",current_coord);
    this.add_marker("polynesia",{lat: -8.826494, lng: -140.142672});
    this.add_marker("tokyo",{lat: 35.626411, lng: 139.776893});
    this.add_marker("auckland",{lat: -36.841539, lng: 174.761052});
    this.add_marker("vladivostok",{lat: 43.114753, lng: 131.872834});
    this.add_marker("vancouver",{lat: 48.802228, lng: -123.601410});
  }

  this.markers = [];

  this.add_marker = function(name,coord)
  {
    this.markers.push(new google.maps.Marker({ position: coord, icon: { path: google.maps.SymbolPath.CIRCLE, strokeColor: 'red', scale: 2, strokeWeight: 0, fillOpacity: 1, fillColor:'white' }, draggable: false, map: map }));
  }

  this.style = [{
      "featureType": "water","elementType": "geometry","stylers": [{ "color": "#000000" }]},{
      "featureType": "landscape", "stylers": [{ "color": "#222222" }]},{
      "featureType": "transit", "stylers": [{ "visibility": "off" }]},{
      "featureType": "road", "stylers": [{ "visibility": "off" }]},{
      "featureType": "poi", "stylers": [{ "visibility": "off" }]},{
      "featureType": "administrative", "stylers": [{ "visibility": "off" }]},{
      "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "visibility": "on" },{ "color": "#222222" }]},{
      "featureType": "landscape", "elementType": "labels", "stylers": [{ "color": "#555555" },{ "visibility": "simplified" }]},{
      "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "visibility": "on" },{ "weight": 0.1 },{ "color": "#111111" }]},{
      "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }]}]

  this.path = function()
  {
    var coordinates = [];
    for(id in invoke.vessel.timeline.events){
      var event = invoke.vessel.timeline.events[id];
      if(event.type != "sail"){ continue; }
      for(i in event.posi){
        var c = event.posi[i];
        var lat = parseFloat(c.split(",")[0].trim());
        var lng = parseFloat(c.split(",")[1].trim())
        coordinates.push({lat:lat,lng:lng});
      }
    }
    return coordinates;
  }

  this.html = `<div id="map" style="height:100vh"></div>`;
}

invoke.vessel.seal("corpse","map");
