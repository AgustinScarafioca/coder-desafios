import logger from '../../../config/logger.js'
import purchases from '../../../models/purchases.js'
import connectMongo from '../../../config/connectMongo.js'

connectMongo();

class Persistence {
    async init() {
		logger.info('products dao en mongodb -> listo!')
	}

	async disconnect() {
		logger.info('products dao en mongodb -> cerrado!')
	}

	async addCompras(data) {
		try {
			const dataAdd = new purchases(data)
			const comprasAdd = await dataAdd.save()
			return comprasAdd
		} catch (err) {
			logger.error('Error al propcesar su compra ' + err)
		}
	}
}

export default new Persistence()