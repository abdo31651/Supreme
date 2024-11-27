const express = require('express');
const mongoose = require('mongoose');
const MongoDB = require('./config/database');
const academicYearRoutes = require('./routes/academicYearRoutes'); // Academic Year routes
const academicStageRoutes = require('./routes/academicStageRoutes'); // Academic Year routes
const permissionRoutes = require('./routes/permissionRoutes');
const rolesRoutes = require('./routes/roleRoutes');
const usersRoutes = require('./routes/userRoutes');
require('dotenv').config();



const app = express();
app.use(express.json()); // Middleware to parse JSON



app.use('/api/academic-year', academicYearRoutes); // Academic Year routes
app.use('/api/academic-stage', academicStageRoutes); // Academic Year routes
app.use('/api/permissions', permissionRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/users', usersRoutes);



// Mount the academic year routes

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));







