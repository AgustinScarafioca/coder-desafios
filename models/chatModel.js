import mongoose from 'mongoose'

const collectionChat = 'listChat'

const schemaChat = new mongoose.Schema({
	author: {
		name: String,
	},
	text: String,
	fyh: String,
})

const chatModel = mongoose.model(collectionChat, schemaChat)

export default chatModel