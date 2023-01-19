const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')
const {ingresar, products} = require('./routers/routers')
const productsTest = require('./routers/routersTest')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const Container = require('./containers/container');
const { normalize, denormalize, schema } = require('normalizr')
const util = require ('util')

const chat = new Container()
const app = express()
const PORT = process.env.port || 8080
const httpServer = HttpServer(app)
const io = new IOServer(httpServer)
const advancedOptions = {useNewUrlParser: true, useUnifiedTopology: true}

app.set('views', './views')
app.set('view engine', 'pug')

app.use(cookieParser())
app.use(session({
    store:MongoStore.create({
        mongoUrl: 'mongodb+srv://coderhouse:coderhouse@backendcoder.zhvn6xh.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: advancedOptions
    }),
    secret: 'coder',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {maxAge: 100000}
}))

app.use(express.static(__dirname + "/public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/ingresar', ingresar)
app.use('/productos', products)
app.use('/test', productsTest)

io.on('connection', async socket =>{
    const messageList = await chat.getChat()
    const stringy = JSON.stringify(messageList)
    const data = JSON.parse(stringy)
    const mensajes = {
        id: 'desafio12',
        messages: data
    }
    console.log('Longitud del objeto original: ' + JSON.stringify(mensajes).length)

    const authorSchema = new schema.Entity('author', {}, {idAttribute: 'email'})
    const messageSchema = new schema.Entity('message', {
        author: authorSchema
    })
    const msgSchema = new schema.Entity('messages', {
        messages: [messageSchema]
    })
    const messageNorm = normalize(mensajes, msgSchema)

    console.log('Longitud del objeto normalizado: ' + JSON.stringify(messageNorm).length)

    const objDenormalized = denormalize(messageNorm.result, msgSchema, messageNorm.entities)

    console.log('Longitud del objeto denormalizado: ' + JSON.stringify(objDenormalized).length)

    console.log('Porcentaje de compresion: ' + (100 - (JSON.stringify(messageNorm).length * 100 / JSON.stringify(mensajes).length) + "%"))

    socket.emit('messages', messageList)

    socket.on('new-message', async data =>{
        if(messageList.length === 0){
            return await chat.addChat({...data, fyh: new Date().toLocaleString(), id: 1})
        } 
        await chat.addChat({ ...data, fyh: new Date().toLocaleString(), id: messageList.length +1 })

        io.sockets.emit('messages', messageList)
    })
})

function print(object){
    console.log(util.inspect(object, false, 12, true))
}

httpServer.listen(PORT, ()=>{
    console.log('Servidor corriendo en ' + PORT)
})