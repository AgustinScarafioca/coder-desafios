import Models from '../models/userModel.js'
import bCrypt from 'bcrypt'
import productsDaoFactory from '../persistence/factory.js'
const persistence = productsDaoFactory.getDao()

function createHash(password) {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}

async function getUser(Correo) {
	const result = await persistence.getUsername(Models, Correo)
	return result
}

async function postUser(data, url,) {
	const newUser = {
		name: data.name,
		lastName: data.lastName,
		address: data.address,
		age: data.age,
		phoneNumber: data.phoneNumber,
		photo: url,
		username: data.username,
		password: createHash(data.password),
		// admin: true,
	}
	const result = await persistence.add(Models, newUser)
	return result
}

export default { getUser, postUser }
