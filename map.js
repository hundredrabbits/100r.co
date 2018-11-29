'use strict'

function GoogleMap (payload) {
  this.el = null

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

  this.install = function () {
    const element = document.getElementById('world')
    setTimeout(() => { this.load(element, payload) }, 500)
  }

  this.load = function (element, payload) {
    console.info('Loading Map')

    // Unpack
    const here = payload.here
    const destinations = payload.destinations
    const vertices = payload.vertices
    const futureVertices = payload.futureVertices

    // Load
    const map = new google.maps.Map(element, { center: here, zoom: 4, disableDefaultUI: true })
    map.set('styles', this.style)

    // Add Path
    const path = new google.maps.Polyline({ path: vertices, geodesic: true, strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 2 })
    path.setMap(map)

    // Future
    const futurePath = new google.maps.Polyline({ path: futureVertices, geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.0, icons: [{ icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, scale: 2 }, offset: '0', repeat: '10px' }] })
    futurePath.setMap(map)

    // Add Markers
    for (const id in destinations) {
      addMarker(map, destinations[id])
    }

    setTimeout(() => { this.show(element) }, 1000)
  }

  this.show = function (element) {
    console.info('Showing Map')
    element.className = 'ready'
  }

  function addMarker (map, pos, icon = { path: google.maps.SymbolPath.CIRCLE, strokeColor: 'red', scale: 2, strokeWeight: 0, fillOpacity: 1, fillColor: 'white' }) {
    new google.maps.Marker({ position: pos, icon: icon, draggable: false, map: map })
  }
}
