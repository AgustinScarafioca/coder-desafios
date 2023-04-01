import logger from '../config/logger.js'
import servicesCart from '../services/cart.js'
import postCompras from '../services/purchases.js'
import { Correo } from '../services/nodemailer.js'
import Whatsapp from '../services/twilio.js'

const postCompra = async (req, res) => {
	const { url, method } = req
	logger.info(`Ruta ${method} ${url}`)
	const mail = req.user.username
	const telefono = req.user.phoneNumber
	const carrito = await servicesCart.getCart(mail)
	const compra = await postCompras({compra: carrito})
	const asunto = `Compra exitosa ${compra._id}`
	const mensaje = `<h1 style="color: blue;">${compra}</h1>`
	const confirmacion = `compra exitosa su id de confirmacion ${compra._id} le llegara una copia a su correo y celular`
	await Correo(mail, asunto, mensaje)
	await Whatsapp(telefono, asunto)
	await servicesCart.deleteCart(mail)
	res.render('UserLogin/compra', { confirmacion })
}

export default postCompra