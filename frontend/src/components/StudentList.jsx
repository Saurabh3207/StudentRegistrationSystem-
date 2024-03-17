import React, { useState } from 'react';
import '../StudentList.css'; 

const StudentList = ({ students, onDeleteStudent, onUpdateStudent }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    firstName: '',
    lastName: '',
    rollNo: '',
    class: '', 
    contactNumber: '',
  });

  const handleUpdateChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };
  const handleUpdateSubmit = (rollNo) => {
    onUpdateStudent(rollNo, updatedData);
    // Close the popup form after submission
    setShowUpdateForm(false); 
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Roll No</th>
            <th>Class</th>
            <th>Contact Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.rollNo}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.rollNo}</td>
              <td>{student.class}</td>
              <td>{student.contactNumber}</td>
              <td>
                <button onClick={() => onDeleteStudent(student.rollNo)}>Delete</button>
                <button onClick={() => {
                  setUpdatedData({
                    firstName: student.firstName,
                    lastName: student.lastName,
                    rollNo: student.rollNo,
                    class: student.class,
                    contactNumber: student.contactNumber,
                  });
                  setShowUpdateForm(true);
                }}>Modify</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showUpdateForm && (
        <div className="popup-form">
          <h2>Update Student</h2>
          <label>
            Update First Name:
            <input type="text" name="firstName" value={updatedData.firstName} onChange={handleUpdateChange} />
          </label>
          <label>
            Update Last Name:
            <input type="text" name="lastName" value={updatedData.lastName} onChange={handleUpdateChange} />
          </label>
          <label>
            Update Roll No:
            <input type="text" name="rollNo" value={updatedData.rollNo} onChange={handleUpdateChange} disabled />
          </label>
          <label>
            Update Class:
            <input type="text" name="class" value={updatedData.class} onChange={handleUpdateChange} />
          </label>
          <label>
            Update Contact Number:
            <input type="text" name="contactNumber" value={updatedData.contactNumber} onChange={handleUpdateChange} />
          </label>
          <button onClick={() => handleUpdateSubmit(updatedData.rollNo)}>Update</button>
          <button onClick={() => setShowUpdateForm(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default StudentList;
