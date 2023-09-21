const express =  require("express")
const student = require('../model/data')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router()

router.use(express.json());

router.get('/list', async (req, res) => {
    try {
        const students = await student.find();

        if (students.length === 0) {
            return res.status(404).json({ message: 'No students found' });
        }

        res.status(200).json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// getting single students Data(details)

router.get('/:id', async (req, res) => {
    try {
        
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: 'student id wrong' });
        }

        const studentId = new ObjectId(req.params.id);
        const getstudent = await student.findById(studentId);

        if (!getstudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(getstudent);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//Adding students data(POST Method)

router.post('/', async (req, res) => {
    try {
        
        const { id, name, college } = req.body;

        if (!id || !name || !college) {
            return res.status(400).json({ error: 'Missing Some of student detail fields' });
        }      
        const newStudent = new student({
            id,
            name,
            college,
        });
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Updating students data(UPDATE method)
router.put('/:id', async (req, res) => {
    try {
        const studentId = req.params.id;
        const { id, name, college } = req.body;

        // Validate if the 'id' parameter is a valid ObjectId
        if (!ObjectId.isValid(studentId)) {
            return res.status(400).json({ error: 'Invalid student ID format' });
        }

        // Find the student by ID in the database
        const existingStudent = await student.findById(studentId);

        if (!existingStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Update the student properties
        existingStudent.id = id;
        existingStudent.name = name;
        existingStudent.college = college;

        // Save the updated student
        const updatedStudent = await existingStudent.save();

        res.status(200).json(updatedStudent);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Deleting students data(DElETE method)
router.delete('/:id',async(req,res)=>{
    try{
        const deletedStudent = await student.findByIdAndDelete(req.params.id);
        res.status(200).json('Deleted Successfully');
    }catch(err){
        res.send('Error')
        console.log(err)
    }
})

module.exports = router

