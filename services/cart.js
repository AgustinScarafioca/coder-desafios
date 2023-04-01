import Factory from '../persistence/factory/cart.js';
const Persistence = Factory.getDao()

async function getCart(Correo) {
	const result = await Persistence.getCart(Correo);
	return result;
}

async function postCart(Usuario) {
	const Data = {
		author: {
			name: Usuario.name,
			lastName: Usuario.lastName,
			address: Usuario.address,
			phoneNumber: Usuario.phoneNumber,
			username: Usuario.username,
		},
		productos: [],
		timestamp: Date.now(),
	};
	const result = await Persistence.addCart(Data);
	return result;
}

async function postProductCart(Correo, Data) {
	const result = await Persistence.updateCart(Correo, { $push: { productos: Data } });
	return result;
}

async function deleteProductCart(Correo, Data) {
	const result = await Persistence.updateCart(Correo, { $pull: { productos: Data } });
	return result;
}

async function deleteCart(Correo) {
	const result = await Persistence.deleteCart(Correo);
	return result;
}

export default { getCart, postCart, postProductCart, deleteProductCart, deleteCart };