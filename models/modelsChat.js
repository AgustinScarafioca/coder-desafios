const mongoose = require('mongoose')

const chatColection = 'chat'

const schemaChat =  new mongoose.Schema({
    author:{
        email: String,
        name: String,
        lastName: String,
        age: Number,
    },
    text: String,
    fyh: String,
    id: Number
})

const models = mongoose.model(chatColection, schemaChat)

module.exports = models