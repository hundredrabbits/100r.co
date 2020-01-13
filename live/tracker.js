'use strict'

function Tracker (route) {
  this.payload = {}

  this.start = function () {
    console.info('Starting Tracker')
    this.update()
    document.getElementById('details').innerHTML = `${this}`
  }

  this.update = function () {
    this.payload.here = this.here()
    console.log('Current Location', this.payload.here)
    this.payload.destinations = this.destinations()
    console.log('Past Destinations', this.payload.destinations.length)
    this.payload.distance = this.distance()
    console.log('Sailed Distance', this.payload.distance)
    this.payload.vertices = this.vertices()
    console.log('Path Vertices', this.payload.vertices.length)
    this.payload.futureVertices = this.futureVertices()
    console.log('Future Vertices', this.payload.futureVertices.length)
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

  this.distance = function () {
    let value = 0
    for (const id in route) {
      value += parseFloat(route[id].VLUE)
    }
    const str = `${parseInt(value * 1.852)}`
    return (str.substr(0, 2) + "'" + str.substr(2, 3)) + 'km'
  }

  this.futureVertices = function () {
    var coordinates = []
    // Last location
    coordinates.push(this.here())
    return coordinates
  }

  this.toString = () => {
    const dates = Object.keys(route)
    const lastUpdate = dates[0]
    const lastPosition = route[lastUpdate]
    return `<a href='../index.html'>Location: ${lastPosition.NAME}<br />Sailed: ${this.payload.distance}<br />${lastUpdate}</a>`
  }

  function convert (pos) {
    const parts = pos.split(',')
    const lat = parseFloat(parts[0].trim())
    const lng = parseFloat(parts[1].trim())
    return { lat: lat, lng: lng }
  }
}
