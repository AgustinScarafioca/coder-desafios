import bCrypt from 'bcrypt'
import Factory from '../persistence/Factory/user.js'
const Persistence = Factory.getDao()

function createHash(password) {
	return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}

async function getUser(Correo) {
	const result = await Persistence.get(Correo)
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
	const result = await Persistence.add(newUser)
	return result
}

export default { getUser, postUser }