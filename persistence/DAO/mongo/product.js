import logger from '../../../config/logger.js'
import connectMongo from '../../../config/connectMongo.js'
import productModel from '../../../models/productModel.js'
import DTO from '../../DTO/product.js'

connectMongo();

class Persistence {
	async init() {
		logger.info('products dao en mongodb -> listo!')
	}

	async disconnect() {
		logger.info('products dao en mongodb -> cerrado!')
	}
	
	async add(data) {
		try {
			const dataAdd = new productModel(data)
			const add = await dataAdd.save(dataAdd)
			return DTO(add)
		} catch (err) {
			logger.error('Error al guardar el producto ' + err)
		}
	}

	async get(name) {
		try {
			if (name) {
				const data = await productModel.find({ name: name })
				return DTO(data);
			} else {
				const data = await productModel.find()
				return DTO(data)
			}
		} catch (err) {
			logger.error('Error al burcar los productos ' + err)
		}
	}
	async getId(id) {
		try {
			const data = await productModel.findById(id)
			return DTO(data)
		} catch (err) {
			logger.error('Error al burcar los productos ' + err)
		}
	}

	async update(id, data) {
		try {
			const update = await productModel.findByIdAndUpdate(id, data)
			return DTO(update)
		} catch (err) {
			logger.error('Error al burcar y actualizar los productos ' + err)
		}
	}

	async delete(id) {
		try {
			const deelete = await productModel.deleteOne({ _id: id })
			return DTO(deelete)
		} catch (err) {
			logger.error('Error al burcar y eliminar los productos ' + err)
		}
	}
}

export default new Persistence()