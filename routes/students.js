const express = require('express');
const router = express.Router();
const Student = require('../models/student'); // Import the Student model (update the path as needed)

// List students
router.get('/', (req, res) => {
  // Assuming you have a Student model, you can retrieve and render the list of students like this:
  Student.find()
    .then((students) => {
      // Render the 'list-students' view and pass the students data to it
      res.render('list-students', { students });
    })
    .catch((err) => {
      // Handle any errors during student retrieval
      console.error(err);
      res.status(500).send('Error retrieving students');
    });
});

// Create a new student
router.get('/new', (req, res) => {
  // Render the form for creating a new student
  res.render('new-student');
});

// Handle form submission for creating a new student
router.post('/', (req, res) => {
  // Create a new student instance based on the form data
  const newStudent = new Student({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
  });

  // Save the new student to the database
  newStudent
    .save()
    .then(() => {
      // Redirect to the list of students after successful creation
      res.redirect('/students');
    })
    .catch((err) => {
      // Handle any errors during student creation
      console.error(err);
      res.status(500).send('Error creating student');
    });
});

// Edit a student
router.get('/:id/edit', (req, res) => {
  // Assuming you have a Student model, you can find the student by ID like this:
  Student.findById(req.params.id)
    .then((student) => {
      if (!student) {
        return res.status(404).send('Student not found');
      }

      // Render the form for editing a student with the retrieved student data
      res.render('edit-student', { student });
    })
    .catch((err) => {
      // Handle any errors during student retrieval
      console.error(err);
      res.status(500).send('Error finding student');
    });
});

// Handle form submission for editing a student
router.put('/:id', (req, res) => {
  // Assuming you have a Student model, you can update the student like this:
  Student.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
  })
    .then(() => {
      // Redirect to the list of students after successful update
      res.redirect('/students');
    })
    .catch((err) => {
      // Handle any errors during student update
      console.error(err);
      res.status(500).send('Error updating student');
    });
});

// Delete a student
router.delete('/:id', (req, res) => {
  // Assuming you have a Student model, you can delete the student like this:
  Student.findByIdAndRemove(req.params.id)
    .then(() => {
      // Redirect to the list of students after successful deletion
      res.redirect('/students');
    })
    .catch((err) => {
      // Handle any errors during student deletion
      console.error(err);
      res.status(500).send('Error deleting student');
    });
});

module.exports = router;
