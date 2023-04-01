import Factory from '../persistence/Factory/purchases.js'
const Persistence = Factory.getDao()

async function postCompras(Compra) {
	const result = await Persistence.addCompras(Compra)
	return result
}

export default postCompras