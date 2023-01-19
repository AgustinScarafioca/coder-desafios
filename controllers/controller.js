const container = require('../containers/container');
const Product = new container();

const get = (req, res) => {
    const id = req.params.id
    if(id){
        const user = req.session.name
        if(user === null || user === undefined){
            return res.redirect('/ingresar')
        }
        Product.get(id)
            .then(productos =>{
                res.json(productos)
            })
            .catch(err => res.json(err))
    }
    else{
        const user = req.session.name
        if(user === null || user === undefined){
            return res.redirect('/ingresar')
        }
        const hi = `Bienvenido ${user}`
        Product.get()
            .then(productos =>{
                res.render('index', {productos, hi})
            })
            .catch(err => res.json(err))
    }
}

const add = (req, res) =>{
    const user = req.session.name
    if(user === null || user === undefined){
        return res.redirect('/ingresar')
    }
    const newProduct = {
        timestamp: Date.now(),
        name: req.body.name,
        description: req.body.description,
        code: req.body.code, 
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        stock: req.body.stock
    }
    Product.add(newProduct)
        .then(id => {
            res.json( { id:id }, res.redirect('/productos') )
        })
        .catch(err => {
            res.json(err)
        })
}

const update = (req, res) =>{
    const user = req.session.name
    if(user === null || user === undefined){
        return res.redirect('/ingresar')
    }
    const product = {
        timestamp: Date.now(),
        name: req.body.name,
        description: req.body.description,
        code: req.body.code, 
        price: req.body.price,
        thumbnail: req.body.thumbnail,
        stock: req.body.stock
    }
    Product.update(req.params.id, product)
        .then(id =>{
            res.json({ id:id })
        })
        .catch(err =>{
            res.json(err)
        })
}

const del = (req, res) =>{
    const user = req.session.name
    if(user === null || user === undefined){
        return res.redirect('/ingresar')
    }
    Product.del(req.params.id)
        .then( id => {
            res.json( { id: id } )
        })
        .catch(err =>{
            res.json(err)
        })
}

const getUser = (req, res) =>{
    const user = req.session.name
    if(user ===null || user === undefined){
        res.render('Ingresar')
    } 
    else{
        res.redirect('/productos')
    }
}

const postUser = (req, res) =>{
    const user = req.body.name
    req.session.name = user
    res.redirect('./productos')
}

const getOut = (req, res) =>{
    const user = req.session.name 
    const bye = `Hasta la proxima, ${user}`
    req.session.destroy (err => {
        if (err) {
            res.json( {error: "Hay un error"} )
        } else {
            res.render('Bye', {bye})
        }
    })
}


module.exports = {
    get,
    add,
    update,
    del,
    getUser,
    postUser,
    getOut
}