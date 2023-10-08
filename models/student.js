// models/student.js

const mongoose = require('mongoose');

// Define the Student schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// Create the Student model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
