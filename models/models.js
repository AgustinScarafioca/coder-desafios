const mongoose = require('mongoose')

const prodColection = 'productos'

const schemaProducts = new mongoose.Schema({
    timestamp: String,
    name: String,
    description: String,
    code: String, 
    price: Number,
    thumbnail: String,
    stock: Number
})

const models = mongoose.model(prodColection, schemaProducts)

module.exports = models