import logger from '../../../config/logger.js'

const Mensajes = []

class Persistence {
	init() {
		logger.info('products dao en memory -> listo!')
	}

	disconnect() {
		logger.info('products dao en memory -> cerrado!')
	}

	getChat() {
		try {
			return Mensajes;
		} catch (err) {
			logger.error('Error al burcar los mensajes ' + err)
		}
	}

	addChat(data) {
		try {
			const add = Mensajes.push(data)
			return add
		} catch (error) {
			logger.error('Error al guardar el mensaje ' + err)
		}
	}
}

export default new Persistence()