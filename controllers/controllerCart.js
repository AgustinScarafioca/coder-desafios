import logger from '../config/logger.js'
import servicesCart from '../services/cart.js'
import servicesProduct from '../services/products.js'

export const getCart = async (req, res) => {
	const { url, method } = req
	logger.info(`Ruta ${method} ${url}`)
	const Correo = req.user.username
	const avatar = req.user.photo
	const saludo = `Bienvenido ${Correo}`
	const result = await servicesCart.getCart(Correo)
	res.render('UserLogin/carrito', { result, avatar, saludo })
}

export const postProductCart = async (req, res) => {
	const { url, method } = req
	logger.info(`Ruta ${method} ${url}`)
	const Usuario = req.user
	const Correo = Usuario.username
	const idProducto = req.body.id
	const resultCart = await servicesCart.getCart(Correo)
	if (resultCart === null) {
		servicesCart.postCart(Usuario)
	}
	const resultProduct = await servicesProduct.getProductId(idProducto)
	await servicesCart.postProductCart(Correo, resultProduct)
	res.redirect('/productos')
}

export const deleteProductCart = async (req, res) => {
	const { url, method } = req
	logger.info(`Ruta ${method} ${url}`)
	const correo = req.user.username
	const idProducto = req.body.id
	const resultProduct = await ServicesProduct.getProductId(idProducto)
	await servicesCart.deleteProductCart(correo, resultProduct)
	res.redirect('/carrito')
}

export const deleteCart = async (req, res) => {
	const { url, method } = req
	logger.info(`Ruta ${method} ${url}`)
	const correo = req.user.username
	await servicesCart.deleteCart(correo)
	res.redirect('/productos')
}