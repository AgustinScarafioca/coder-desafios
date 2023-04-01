import logger from '../../../config/logger.js'
import Dto from '../../DTO/product.js'

const PRODUCTOS = []

class Persistence {
	init() {
		logger.info('products dao en memory -> listo!')
	}

	disconnect() {
		logger.info('products dao en memory -> cerrado!')
	}

	add(data) {
		try {
			if (PRODUCTOS.length === 0) {
				const add = PRODUCTOS.push({ ...data, id: 1 })
				return Dto(add)
			}
			const add = PRODUCTOS.push({ ...data, id: PRODUCTOS.length + 1 })
			return Dto(add)
		} catch (err) {
			logger.error('Error al guardar el producto ' + err)
		}
	}

	get(name) {
		try {
			if (name) {
				const data = PRODUCTOS.find((product) => product.name === name)
				return Dto(data)
			} else {
				const data = PRODUCTOS
				return Dto(data)
			}
		} catch (err) {
			logger.error('Error al burcar los productos ' + err)
		}
	}
	getId(id) {
		try {
			const data = PRODUCTOS.find((product) => product.id === id)
			return Dto(data);
		} catch (err) {
			logger.error('Error al burcar los productos ' + err)
		}
	}

	update(id, data) {
		try {
			const index = PRODUCTOS.findIndex((produc) => produc.id === id)
			const actualizado = { ...PRODUCTOS[index], ...data }
			const update = PRODUCTOS.splice(index, 1, actualizado)
			return Dto(update);
		} catch (err) {
			logger.error('Error al burcar y actualizar los productos ' + err)
		}
	}

	delete(id) {
		try {
			const index = PRODUCTOS.findIndex((produc) => produc.id === id)
			const deelete = PRODUCTOS.splice(index, 1)
			return Dto(deelete)
		} catch (err) {
			logger.error('Error al burcar y eliminar los productos ' + err)
		}
	}
}

export default new Persistence()