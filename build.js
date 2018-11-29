'use strict'

console.time('Setup')

const Database = require('./build/database')
const Manager = require('./build/manager')
const Builder = require('./build/builder')

const indexes = ['home', 'blog', 'knowledge', 'tools', 'games', 'raspberry']
const database = new Database(indexes)
const manager = new Manager(database.storage)
const builder = new Builder(manager.pages, manager.feeds)

console.timeEnd('Setup')

console.time('Build')

builder.build()

console.timeEnd('Build')
