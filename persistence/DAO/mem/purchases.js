import logger from '../../../config/logger.js'

const Compras = []

class Persistence {
	async init() {
		logger.info('products dao en memory -> listo!')
	}

	async disconnect() {
		logger.info('products dao en memory -> cerrado!')
	}

	async addCompras(data) {
		try {
			return Compras.push(data)
		} catch (err) {
			logger.error('Error al propcesar su compra ' + err)
		}
	}
}

export default new Persistence()