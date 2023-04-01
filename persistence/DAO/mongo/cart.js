import logger from '../../../config/logger.js';
import connectMongo from '../../../config/connectMongo.js'
import cartModel from '../../../models/cartModel.js'

connectMongo();

class Persistence {
    async init() {
		logger.info('products dao en mongodb -> listo!')
	}

	async disconnect() {
		logger.info('products dao en mongodb -> cerrado!')
	}

	async addCart(data) {
		try {
			const dataAdd = new cartModel(data)
			const cartAdd = await dataAdd.save()
			return cartAdd
		} catch (err) {
			logger.error('Error al guardar el carrito ' + err)
		}
	}

	async getCart(correo) {
		try {
			const cart = await cartModel.findOne({ 'author.username': correo })
			return cart;
		} catch (err) {
			logger.error('Error al buscar el carrito ' + err)
		}
	}

	async updateCart(correo, data) {
		try {
			const producUpdate = await cartModel.updateOne({ 'author.username': correo }, data)
			return producUpdate;
		} catch (err) {
			logger.error('Error al buscar el carrito y actualizar ' + err)
		}
	}

	async deleteCart(correo) {
		try {
			const producDelete = await cartModel.deleteOne({ 'author.username': correo })
			return producDelete
		} catch (error) {
			logger.error('Error al borrar el carrito ' + err)
		}
	}
}

export default new Persistence()