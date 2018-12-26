'use strict'

function Tracker (route) {
  this.payload = {}

  this.start = function () {
    console.info('Starting Tracker')
    this.update()
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
    // Chichijima
    coordinates.push({ lat: 27.079352, lng: 142.204142 })
    // Wakayama
    coordinates.push({ lat: 33.738601, lng: 135.278150 })
    // Osaka Bay
    coordinates.push({ lat: 34.336973, lng: 135.178785 })
    //
    return coordinates
  }

  function convert (pos) {
    const parts = pos.split(',')
    const lat = parseFloat(parts[0].trim())
    const lng = parseFloat(parts[1].trim())
    return { lat: lat, lng: lng }
  }
}
