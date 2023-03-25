import logger from '../config/logger.js'


export const getSignIn = (req, res) => {
    const { url, method } = req
    logger.info('Ruta ' + method + url)
    if (req.isAuthenticated()) {
        res.redirect("/productos")
    }
    res.render("ingresar")
}

export const getSignUp = (req, res) => {
    const { url, method } = req
    logger.info('Ruta ' + method + url )
    if (req.isAuthenticated()) {
        res.redirect("/productos")
    };
    res.render("registrarse")
}

export const getLogout = (req, res) => {
    const { url, method } = req
    logger.info('Ruta ' + method + url )
    const user = req.user.username
    req.logout(err => {
        const saludo = `Hasta luego ${user}`
        res.render("saludo", {saludo})
    })
}

export const getErrorLogin = async (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`)
	res.render('User/login-error')
}

export const getErrorRegister = async (req, res) => {
	const { url, method } = req
	logger.info(`Ruta ${method} ${url}`)
	res.render('User/register-error')
}

export const getInicio = async (req, res) => {
	const { url, method } = req;
	logger.info(`Ruta ${method} ${url}`)
	if (req.user === undefined) {
		return res.render('User/inicioUser')
	}
	const user = req.user
	const avatar = user.photo
	const saludo = `Bienvenido ${user.username}`
	if (user.admin === true) {
		return res.render('Admin/inicioAdmin', { saludo, avatar })
	}
	res.render('UserLogin/inicioUserLogin', { saludo, avatar })
}