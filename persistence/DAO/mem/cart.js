import logger from '../../../config/logger.js'

const Carrito = []

class Persistence {
	init() {
		logger.info('products dao en memory -> listo!')
	}

	disconnect() {
		logger.info('products dao en memory -> cerrado!')
	}

	addCart(data) {
		try {
			const cartAdd = Carrito.push(data)
			return cartAdd
		} catch (err) {
			logger.error('Error al guardar el carrito ' + err)
		}
	}

	getCart(correo) {
		try {
			const cart = Carrito.find((carr) => carr.author.username === correo)
			return cart
		} catch (err) {
			logger.error('Error al buscar el carrito ' + err)
		}
	}

	updateCart(correo, data) {
		try {
			const index = Carrito.findIndex((carr) => carr.author.username === correo)
			const actualizado = { ...Carrito[index], ...data }
			const producUpdate = Carrito.splice(index, 1, actualizado)
			return producUpdate
		} catch (err) {
			logger.error('Error al buscar el carrito y actualizar ' + err)
		}
	}

	deleteCart(correo) {
		try {
			const index = Carrito.findIndex((carr) => carr.author.username === correo)
			const producDelete = Carrito.splice(index, 1)
			return producDelete
		} catch (error) {
			logger.error('Error al borrar el carrito ' + err)
		}
	}
}

export default new Persistence()