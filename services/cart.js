import productsDaoFactory from '../persistence/factory.js'
import Models from '../models/cartModel.js'

const persistence = productsDaoFactory.getDao()

async function getCart(Correo) {
	const result = await persistence.getCorreo(Models, Correo)
	return result
}

async function postCart(Usuario) {
	const Data = {
		author: {
			name: Usuario.name,
			lastName: Usuario.lastName,
			address: Usuario.address,
			phoneNumber: Usuario.phoneNumber,
			username: Usuario.username,
		},
		productos: [],
		timestamp: Date.now(),
	}
	const result = await persistence.add(Models, Data)
	return result
}

async function postProductCart(Correo, Data) {
	const result = await persistence.updateCorreo(Models, Correo, { $push: { productos: Data } })
	return result
}

async function deleteProductCart(Correo, Data) {
	const result = await persistence.updateCorreo(Models, Correo, { $pull: { productos: Data } })
	return result
}

async function deleteCart(Correo) {
	const result = await persistence.deleteCorreo(Models, Correo)
	return result
}

export default { getCart, postCart, postProductCart, deleteProductCart, deleteCart }