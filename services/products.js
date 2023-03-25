import Models from '../models/productModel.js'
import productsDaoFactory from '../persistence/factory.js'
const persistence = productsDaoFactory.getDao()

async function getProduct() {
	const result = await persistence.get(Models)
	return result
}

async function getProductName(Name) {
	const result = await persistence.getName(Models, Name)
	return result
}

async function getProductId(Id) {
	const result = await persistence.getId(Models, Id)
	return result
}

async function postProduct(Producto) {
	const Data = {
		timestamp: Date.now(),
		name: Producto.name.toLowerCase().charAt(0).toUpperCase() + Producto.name.slice(1),
		description: Producto.description,
		code: Producto.code,
		price: Producto.price,
		photo: Producto.photo,
		stock: Producto.stock,
	}
	const result = await persistence.add(Models, Data)
	return result
}

async function updateProduct(Id, Producto) {
	const Data = {
		timestamp: Date.now(),
		name: Producto.name.toLowerCase().charAt(0).toUpperCase() + Producto.name.slice(1),
		description: Producto.description,
		code: Producto.code,
		price: Producto.price,
		photo: Producto.photo,
		stock: Producto.stock,
	}
	const result = await persistence.updateId(Models, Id, Data)
	return result
}

async function deleteProduct(Id) {
	const result = await persistence.deleteId(Models, Id)
	return result
}

export default { getProduct, getProductName, getProductId, postProduct, updateProduct, deleteProduct }