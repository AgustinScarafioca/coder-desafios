import mongoose from "mongoose"

const collectionProducts = "productos"

const schemaProductos = new mongoose.Schema({
    timestamp: String,
    name: String,
    description: String,
    code: String,
    price: Number,
    thumbnail: String,
    stock: Number,
});

const productModel = mongoose.model(collectionProducts, schemaProductos)

export default productModel