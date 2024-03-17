require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Define student schema and model
const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  rollNo: String,
  class: String,
  contactNumber: String,
}, { collection: 'Registered-StudentData' });

const Student = mongoose.model('Student', studentSchema, 'StudentRegistration');

// API routes
app.post('/api/students', async (req, res) => {
  // Logic for adding a new student
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
  // Logic for retrieving all students
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
});

app.put('/api/students/:rollNo', async (req, res) => {
  // Logic for updating a student
  const rollNo = req.params.rollNo;
  try {
    const updatedStudent = await Student.findOneAndUpdate({ rollNo }, req.body, { new: true });
    res.json({ message: 'Student updated successfully', student: updatedStudent });
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error: error.message });
  }
});

app.delete('/api/students/:rollNo', async (req, res) => {
  // Logic for deleting a student
  const rollNo = req.params.rollNo;
  try {
    await Student.findOneAndDelete({ rollNo });
    res.json({ message: 'Student deleted successfully', deletedStudentRollNo: rollNo });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error: error.message });
  }
});

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Serve index.html for any other routes to support client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
