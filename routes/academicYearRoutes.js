const express = require('express');
const router = express.Router();
const academicYearController = require('../controllers/academicYearController');

// **Create** - Creates a new academic year
router.post('/create', academicYearController.createAcademicYear);

// **Read** - Retrieves all academic years
router.get('/', academicYearController.getAllAcademicYears);

// **Read** - Retrieves a specific academic year by ID
router.get('/:id', academicYearController.getAcademicYearById);

// **Update** - Updates a specific academic year by ID
router.put('/:id', academicYearController.updateAcademicYear);

// **Delete** - Deletes a specific academic year by ID
router.delete('/:id', academicYearController.deleteAcademicYear);

module.exports = router;
