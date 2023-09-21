const express = require('express')
const mongoose = require('mongoose')


const app = express()

app.listen(9000,()=>{
    console.log('the server is working')
});
app.use(authroute)