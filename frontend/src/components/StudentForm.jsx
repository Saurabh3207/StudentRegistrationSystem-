// src/components/StudentForm.jsx

import React, { useState, useEffect } from 'react';

const StudentForm = ({ onAddStudent, onUpdateStudent, selectedStudent }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    rollNo: '',
    class: '',
    birthdate: '',
    contactNumber: '',
  });

  useEffect(() => {
    if (selectedStudent) {
      // If a student is selected (for updating), populate the form with their details
      setFormData(selectedStudent);
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedStudent) {
      // If a student is selected, call the update function
      onUpdateStudent(formData);
    } else {
      // Otherwise, call the add function
      onAddStudent(formData);
    }
    // Clear the form after submission
    setFormData({
      firstName: '',
      lastName: '',
      rollNo: '',
      class: '',
      birthdate: '',
      contactNumber: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
      </label>
      <label>
        Roll No:
        <input type="text" name="rollNo" value={formData.rollNo} onChange={handleChange} />
      </label>
      <label>
        Class:
        <input type="text" name="class" value={formData.class} onChange={handleChange} />
      </label>
      <label>
        Contact Number:
        <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
      </label>
      <button type="submit">{selectedStudent ? 'Update Student' : 'Add Student'}</button>
    </form>
  );
};

export default StudentForm;
