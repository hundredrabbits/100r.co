function GoogleMap () {

  var map = null

  this.style = [{
    'featureType': 'water', 'elementType': 'geometry', 'stylers': [{ 'color': '#000000' }] }, {
    'featureType': 'landscape', 'stylers': [{ 'color': '#333333' }] }, {
    'featureType': 'transit', 'stylers': [{ 'visibility': 'off' }] }, {
    'featureType': 'road', 'stylers': [{ 'visibility': 'off' }] }, {
    'featureType': 'poi', 'stylers': [{ 'visibility': 'off' }] }, {
    'featureType': 'administrative', 'stylers': [{ 'visibility': 'off' }] }, {
    'featureType': 'water', 'elementType': 'labels.text.fill', 'stylers': [{ 'visibility': 'on' }, { 'color': '#333333' }] }, {
    'featureType': 'landscape', 'elementType': 'labels', 'stylers': [{ 'color': '#555555' }, { 'visibility': 'simplified' }] }, {
    'featureType': 'road', 'elementType': 'geometry.stroke', 'stylers': [{ 'visibility': 'on' }, { 'weight': 0.1 }, { 'color': '#111111' }] }, {
    'elementType': 'labels.text.stroke', 'stylers': [{ 'visibility': 'off' }] }]

  this.start = function () {

    map = new google.maps.Map(document.getElementById('world'), { center: this.here(), zoom: 7, disableDefaultUI: true })

    map.set('styles', this.style)

    // this.add_destinations()

    // var path = new google.maps.Polyline({ path: this.path(), geodesic: true, strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 2 })

    // path.setMap(map)

    var upcoming_path = new google.maps.Polyline({ path: this.upcomingPath(),
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 0.0,
      icons: [{
        icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, scale: 2 },
        offset: '0',
        repeat: '10px'
      }] })
    upcoming_path.setMap(map)
  }

  this.markers = []

  this.add_marker = function (name, coord) {
    this.markers.push(new google.maps.Marker({ position: coord, icon: { path: google.maps.SymbolPath.CIRCLE, strokeColor: 'red', scale: 2, strokeWeight: 0, fillOpacity: 1, fillColor: 'white' }, draggable: false, map: map }))
  }

  

  // this.add_destinations = function () {
  //   for (id in invoke.vessel.timeline.events) {
  //     var event = invoke.vessel.timeline.events[id]
  //     if (event.type != 'sail') { continue }
  //     var c = event.posi[0]
  //     var lat = parseFloat(c.split(',')[0].trim())
  //     var lng = parseFloat(c.split(',')[1].trim())
  //     this.add_marker(event.name, { lat: lat, lng: lng })
  //   }
  // }

  // this.path = function () {
  //   var coordinates = []
  //   for (id in invoke.vessel.timeline.events) {
  //     var event = invoke.vessel.timeline.events[id]
  //     if (event.type != 'sail') { continue }
  //     for (i in event.posi) {
  //       var c = event.posi[i]
  //       var lat = parseFloat(c.split(',')[0].trim())
  //       var lng = parseFloat(c.split(',')[1].trim())
  //       coordinates.push({ lat: lat, lng: lng })
  //     }
  //   }
  //   return coordinates
  // }

  this.upcomingPath = function () {
    var coordinates = []
    // Last location
    coordinates.push(this.here())
    // Majuro
    coordinates.push({ lat: 7.101722, lng: 171.369853 })
    // Kosrea
    coordinates.push({ lat: 5.348007, lng: 162.946751 })
    // Guam
    coordinates.push({ lat: 13.492058, lng: 144.740704 })
    // Wakayama
    coordinates.push({ lat: 33.738601, lng: 135.278150 })
    // Osaka Bay
    coordinates.push({ lat: 34.336973, lng: 135.178785 })

    return coordinates
  }

  this.here = function () {
    return { lat: 7.101722, lng: 171.369853 }
    // var coordinates = []
    // for (id in invoke.vessel.timeline.events) {
    //   var event = invoke.vessel.timeline.events[id]
    //   if (event.type != 'sail') { continue }
    //   for (i in event.posi) {
    //     var c = event.posi[i]
    //     var lat = parseFloat(c.split(',')[0].trim())
    //     var lng = parseFloat(c.split(',')[1].trim())
    //     return { lat: lat, lng: lng }
    //   }
    // }
    // return coordinates
  }
}