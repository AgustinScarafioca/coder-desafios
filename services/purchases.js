import Models from '../models/purchases.js'
import productsDaoFactory from '../persistence/factory.js'
const persistence = productsDaoFactory.getDao()

async function postPurchases(Compra) {
	const result = await persistence.add(Models, Compra)
	return result
}

export default postPurchases