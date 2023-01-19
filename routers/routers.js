const { get, add, update, del, postUser, getOut, getUser} = require('../controllers/controller')

const { Router } = require('express')

const products = Router()
const ingresar = Router()

ingresar.get('/', getUser)
ingresar.post('/', postUser)


products.get('/salir', getOut)

products.get('/:id?', get)
products.post('/', add)
products.put('/:id', update)
products.delete('/:id', del)

module.exports = {
    products,
    ingresar
}