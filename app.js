const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config({ path: 'config.env' });

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB Configuration
mongoose.connect(
  `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@${process.env.ATLAS_DBSERVER}/${process.env.DATABASE}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // Increase the timeout to 30 seconds
  }
);

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log(`Connected to MongoDB: ${process.env.DATABASE}`);
});

// Define your routes here
const studentsRouter = require('./routes/students');

// Include the studentsRouter for the root path ("/")
app.use('/students', studentsRouter);

// Set the view engine to EJS
app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
