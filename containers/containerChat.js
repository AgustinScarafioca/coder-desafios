import mongoose, { model } from 'mongoose'
import modelsChat from '../models/modelsChat'

mongoose.set('strictQuery', false)

mongoose.connect('mongodb+srv://coderhouse:coderhouse@backendcoder.zhvn6xh.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) =>{
    if(err){
        console.log(err)
    }
    else{
        console.log('MongoDb connected')
    }
})

export default class Container {

    async getChat(){
        const data = await modelsChat.find({}, {_id: 0, __v:0})
        return data
    }

    async addChat(data){
        const dataAdd = new modelsChat(data)
        const add = await dataAdd.save()
        return add
    }
}
