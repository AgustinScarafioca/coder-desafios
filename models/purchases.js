import mongoose from 'mongoose';

const collectionPurchases = 'purchases';

const schemaPurchases = new mongoose.Schema({
	compra: Object
});

const purchasesModel = mongoose.model(collectionPurchases, schemaPurchases);

export default purchasesModel;