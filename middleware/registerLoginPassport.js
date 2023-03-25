import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bCrypt from 'bcrypt'
import servicesUser from '../services/user.js'
import { Correo } from '../services/nodemailer.js'
import dotenv from 'dotenv'

dotenv.config()

const USER = process.env.USER

function isValidPassword(user, password) {
	return bCrypt.compareSync(password, user.password)
}

export const register = new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
	const data = req.body;
	const user = await servicesUser.getUser(username)
	const url = req.file.path.slice(6)
	const subject = 'Nuevo Usuario Registrado'
	const mensaje = `<h1 style="color: blue;">Se Ha Registrado Un Nuevo Usuario ${data.name}, ${data.lastName}, ${data.address}, ${data.age}, ${data.phoneNumber}</h1>`
	if (user) {
		return done('el usuario ya esta registrado', false)
	}
	const newUser = await servicesUser.postUser(data, url)
	const correo = await Correo(USER, subject, mensaje)
	done(null, newUser)
})

export const login = new LocalStrategy(async (username, password, done) => {
	const user = await servicesUser.getUser(username)
	if (!user) {
		return done('no existe el usuario', false)
	}
	if (!isValidPassword(user, password)) {
		return done('Contraseña incorrecta', false)
	}
	return done(null, user)
})

passport.serializeUser((user, done) => {
	done(null, user.username)
})

passport.deserializeUser(async (username, done) => {
	const user = await servicesUser.getUser(username)
	done(null, user)
})