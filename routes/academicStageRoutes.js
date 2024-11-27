const express = require('express');
const router = express.Router();
const AcademicStageController = require('../controllers/academicStageController');

// Create Academic Stage
router.post('/create', AcademicStageController.createAcademicStage);

// Get All Academic Stages
router.get('/', AcademicStageController.getAllAcademicStages);

// Get Academic Stage by ID
router.get('/:id', AcademicStageController.getAcademicStageById);

// Update Academic Stage by ID
router.put('/:id', AcademicStageController.updateAcademicStage);

// Delete Academic Stage by ID
router.delete('/:id', AcademicStageController.deleteAcademicStage);

module.exports = router;
