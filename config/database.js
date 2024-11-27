const mongoose = require('mongoose');
// Correct MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://zezomodebode:Zezomodebode123@supreme-cluster.ut6le.mongodb.net/?retryWrites=true&w=majority&appName=supreme-Cluster';

// Connect to MongoDB Atlas
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((error) => {
    console.error('MongoDB Connection error:', error);
  });

module.exports = mongoose;
