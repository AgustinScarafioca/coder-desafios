import logger from '../config/logger.js'
import servicesProducts from '../services/products.js'

export const getProduct = async (req, res) => {
	const { url, method } = req
	logger.info(`Ruta ${method} ${url}`)
	const user = req.user
	if (user === undefined) {
		const products = await servicesProducts.getProduct()
		return res.render('User/productosUser', { products })
	}
	const saludo = `Bienvenido ${user.username}`
	const avatar = user.photo
	if (user.admin === true) {
		const products = await servicesProducts.getProduct()
		return res.render('Admin/productosAdmin', { products, saludo, avatar })
	}
	const products = await servicesProducts.getProduct()
	res.render('UserLogin/productosUserLogin', { products, saludo, avatar })
};

export const getProductName = async (req, res) => {
	const { url, method } = req
	logger.info(`Ruta ${method} ${url}`)
	const name = req.body.nameb.charAt(0).toUpperCase() + req.body.nameb.slice(1)
	const user = req.user
	if (user === undefined) {
		const products = await servicesProducts.getProductName(name)
		return res.render('User/productosUser', { products })
	}
	const saludo = `Bienvenido ${user.username}`
	const avatar = user.photo
	if (user.admin === true) {
		const products = await servicesProducts.getProductName(name)
		return res.render('Admin/productosAdmin', { products, saludo, avatar })
	}
	const products = await servicesProducts.getProductName(name);
	res.render('UserLogin/productosUserLogin', { products, saludo, avatar })
}

export const postProduct = async (req, res) => {
	const { url, method } = req
	logger.info(`Ruta ${method} ${url}`)
	const product = req.body;
	await servicesProducts.postProduct(product)
	res.redirect('/productos')
}

export const updateProduct = async (req, res) => {
	const { url, method } = req
	logger.info(`Ruta ${method} ${url}`)
	const id = req.params.id
	const product = req.body
	await servicesProducts.updateProduct(id, product)
	res.redirect('/productos')
}

export const deleteProduct = async (req, res) => {
	const { url, method } = req
	logger.info(`Ruta ${method} ${url}`)
	const id = req.params.id
	await servicesProducts.deleteProduct(id)
	res.redirect('/productos')
}