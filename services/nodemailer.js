import { transporter } from '../config/connectNodemailer.js'
import logger from '../config/logger.js'

export const Correo = async (to, subject, html) => {
	const mail = {
		from: 'Servidor Node.js',
		to: to,
		subject: subject,
		html: html,
	}
	try {
		const mensaje = await transporter.sendMail(mail)
		return mensaje
	} catch (err) {
		logger.error(err)
	}
}