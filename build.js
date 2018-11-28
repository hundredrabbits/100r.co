console.log('Build')

const Database = require('./build/database')

// Load Database

const database = new Database(["applications","blog","knowledge","pages","raspberry","timeline"])
