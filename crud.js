const express =  require("express")
const mongoose = require("mongoose")
const url  = 'mongodb://localhost/curd'

const app = express()
mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true })

const con = mongoose.connection

const crudRouter = require('./route/operation')
app.use('/operation',crudRouter)

con.on('open',() => {
    console.log('connected.....')
})
app.use(express.json())

app.listen(9000,()=>{
    console.log('Server Started.....')
})