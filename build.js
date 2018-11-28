console.time("Build");

const Database = require('./build/database')
const Manager = require('./build/manager')
const Builder = require('./build/builder')

const indexes = ["applications","blog","knowledge","pages","raspberry","timeline"]
const database = new Database(indexes)
const manager = new Manager(database)
const builder = new Builder(manager)

builder.build()

console.timeEnd("Build");