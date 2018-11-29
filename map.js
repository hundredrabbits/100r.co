'use strict'

function GoogleMap (route) {
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
    const here = this.here()
    console.log('Current Location', here)
    const destinations = this.destinations()
    console.log('Destinations', destinations.length)
    const vertices = this.vertices()
    console.log('Vertices', vertices.length)
    const futureVertices = this.futureVertices()
    console.log('Future', futureVertices.length)

    const element = document.getElementById('world')
    const map = new google.maps.Map(element, { center: here, zoom: 5, disableDefaultUI: true })

    map.set('styles', this.style)

    // Add Path
    const path = new google.maps.Polyline({ path: vertices, geodesic: true, strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 2 })
    path.setMap(map)

    // Future
    const futurePath = new google.maps.Polyline({ path: futureVertices, geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.0, icons: [{ icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, scale: 2 }, offset: '0', repeat: '10px' }] })
    futurePath.setMap(map)

    // Add Markers
    for (const id in destinations) {
      const pos = destinations[id]
      addMarker(map, pos)
    }
  }

  this.here = function () {
    const key = Object.keys(route)[0]
    const pos = convert(route[key].POSI[0])
    return pos
  }

  this.destinations = function () {
    const a = []
    for (const id in route) {
      a.push(convert(route[id].POSI[0]))
    }
    return a
  }

  this.vertices = function () {
    const a = []
    for (const id in route) {
      const destination = route[id]
      for (const id in destination.POSI) {
        a.push(convert(destination.POSI[id]))
      }
    }
    return a
  }

  this.futureVertices = function () {
    var coordinates = []
    // Last location
    coordinates.push(this.here())
    // Guam
    coordinates.push({ lat: 13.492058, lng: 144.740704 })
    // Wakayama
    coordinates.push({ lat: 33.738601, lng: 135.278150 })
    // Osaka Bay
    coordinates.push({ lat: 34.336973, lng: 135.178785 })
    //
    return coordinates
  }

  function addMarker (map, pos, icon = { path: google.maps.SymbolPath.CIRCLE, strokeColor: 'red', scale: 2, strokeWeight: 0, fillOpacity: 1, fillColor: 'white' }) {
    new google.maps.Marker({ position: pos, icon: icon, draggable: false, map: map })
  }

  function convert (pos) {
    const parts = pos.split(',')
    const lat = parseFloat(parts[0].trim())
    const lng = parseFloat(parts[1].trim())
    return { lat: lat, lng: lng }
  }
}
