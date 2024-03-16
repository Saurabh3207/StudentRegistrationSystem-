import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './App.css';

const App = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const addStudent = async (studentData) => {
    try {
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      const result = await response.json();
      console.log(result);

      fetchStudents();
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const updateStudent = async (rollNo, updatedData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/students/${rollNo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const result = await response.json();
      console.log(result);

      fetchStudents();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const deleteStudent = async (rollNo) => {
    try {
      const response = await fetch(`http://localhost:5000/api/students/${rollNo}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      console.log(result);

      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div>
      <h1>Student Management System</h1>
      <StudentForm onAddStudent={addStudent} />
      <StudentList
        students={students}
        onDeleteStudent={deleteStudent}
        onUpdateStudent={updateStudent}
      />
    </div>
  );
};

export default App;
