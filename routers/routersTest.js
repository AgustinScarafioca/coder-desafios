const { Router } = require('express')
const { faker } = require('@faker-js/faker')
faker.locale= 'es'

const productsTest = Router()

productsTest.get('/', (req, res)=> {
    let products = []
    for( let i = 0; i < 6; i++){
        products.push(createProduct(i+1))
    }

    res.render('index', {products})
})

function createProduct(id){
    return {
        id: id,
        name: faker.commerce.product(),
        description: faker.commerce.product(),
        code: faker.commerce.product,
        price: faker.commerce.price(),
        stock: faker.commerce.stock(),
        thumbnail: faker.image.abstract()
    }
}

module.exports= productsTest