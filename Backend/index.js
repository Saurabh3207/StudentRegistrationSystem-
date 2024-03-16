require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

//mongo db connection string is pasted below 
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

  const studentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    rollNo: String,
    class: String,
    contactNumber: String,
}, { collection: 'Registered-StudentData' });

const Student = mongoose.model('Student', studentSchema, 'StudentRegistration');


app.post('/api/students', async (req, res) => {
  try {
    if (!req.body.firstName || !req.body.lastName || !req.body.rollNo) {
      return res.status(400).json({ message: 'Incomplete student information' });
    }

    const newStudent = await Student.create(req.body);
    res.json({ message: 'Student added successfully', student: newStudent });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Error adding student', error: error.message });
  }
});

app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
});

app.put('/api/students/:rollNo', async (req, res) => {
  const rollNo = req.params.rollNo;
  try {
    const updatedStudent = await Student.findOneAndUpdate({ rollNo }, req.body, { new: true });
    res.json({ message: 'Student updated successfully', student: updatedStudent });
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error: error.message });
  }
});

app.delete('/api/students/:rollNo', async (req, res) => {
  const rollNo = req.params.rollNo;
  try {
    await Student.findOneAndDelete({ rollNo });
    res.json({ message: 'Student deleted successfully', deletedStudentRollNo: rollNo });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
