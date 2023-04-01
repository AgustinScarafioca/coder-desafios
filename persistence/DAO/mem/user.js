import logger from '../../../config/logger.js'
import Dto from '../../DTO/user.js'

const USER = []

class Persistence {
	init() {
		logger.info('products dao en memory -> listo!')
	}

	disconnect() {
		logger.info('products dao en memory -> cerrado!')
	}

	get(data) {
		try {
			const user = USER.find(Persona => Persona.username === data)
			return Dto(user)
		} catch (err) {
			logger.error('Error al burcar un usuario ' + err)
		}
	}

	add(data) {
		try {
			const add = USER.push(data)
			return Dto(add)
		} catch (err) {
			logger.error('Error al guardar el usaurio ' + err)
		}
	}
}

export default new Persistence()