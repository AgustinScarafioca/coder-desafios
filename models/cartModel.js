import mongoose from 'mongoose'

const collectionCart = 'cartList'

const schemaCart = new mongoose.Schema({
	author: {
		name: { type: String, require: true },
		lastName: { type: String, require: true },
		address: { type: String, require: true },
		phoneNumber: { type: Number, require: true },
		username: { type: String, require: true },
	},
	productos: [],
	timestamp: String,
});

const cartModel = mongoose.model(collectionCart, schemaCart)

export default cartModel