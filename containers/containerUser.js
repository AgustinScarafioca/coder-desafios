import mongoose from 'mongoose'
import models from '../models/models'

mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://coderhouse:coderhouse@backendcoder.zhvn6xh.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) =>{
    if(err){
        console.log(err)
    } 
    else{
        console.log('MongoDB connected')
    }
})

export default class Container{

    async getUser(data){
        const user = await modelsUser.findOne({ username: data })
        return user
    }

    async addUser(data){
        const dataAdd = new modelsUser(data)
        const add = await dataAdd.save()
        return add
    }
}