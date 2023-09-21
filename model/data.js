const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('student',studentSchema)