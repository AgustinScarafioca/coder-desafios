import Factory from '../persistence/Factory/product.js'
const Persistence = Factory.getDao()

async function getProduct() {
	const result = await Persistence.get()
	return result
}

async function getProductName(Name) {
	const result = await Persistence.get(Name)
	return result
}

async function getProductId(Id) {
	const result = await Persistence.getId(Id)
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
	const result = await Persistence.add(Data)
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
	const result = await Persistence.update(Id, Data)
	return result
}

async function deleteProduct(Id) {
	const result = await Persistence.delete(Id)
	return result
}

export default { getProduct, getProductName, getProductId, postProduct, updateProduct, deleteProduct }