import logger from '../../../config/logger.js'
import connectMongo from '../../../config/connectMongo.js'
import userModel from '../../../models/userModel.js'
import DTO from '../../DTO/user.js'

connectMongo();

class Persistence {
	async init() {
		logger.info('products dao en mongodb -> listo!')
	}

	async disconnect() {
		logger.info('products dao en mongodb -> cerrado!')
	}

	async get(data) {
		try {
			const user = await userModel.findOne({ username: data })
			return DTO(user)
		} catch (err) {
			logger.error('Error al burcar un usuario ' + err)
		}
	}

	async add(data) {
		try {
			const dataAdd = new userModel(data)
			const add = await dataAdd.save()
			return DTO(add)
		} catch (err) {
			logger.error('Error al guardar el usaurio ' + err)
		}
	}
}

export default new Persistence()