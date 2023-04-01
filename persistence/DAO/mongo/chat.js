import logger from '../../../config/logger.js'
import connectMongo from '../../../config/connectMongo.js'
import chatModel from '../../../models/chatModel.js'

connectMongo()

class Persistence {
    async init() {
		logger.info('products dao en mongodb -> listo!')
	}

	async disconnect() {
		logger.info('products dao en mongodb -> cerrado!')
	}

	async getChat() {
		try {
			const data = await chatModel.find({}, { _id: 0, __v: 0 })
			return data
		} catch (err) {
			logger.error('Error al burcar los mensajes ' + err)
		}
	}

	async addChat(data) {
		try {
			const dataAdd = new chatModel(data)
			const add = await dataAdd.save()
			return add
		} catch (error) {
			logger.error('Error al guardar el mensaje ' + err)
		}
	}
}

export default new Persistence()