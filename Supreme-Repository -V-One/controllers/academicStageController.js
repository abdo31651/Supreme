const AcademicStageService = require('../services/academicStageServices');
const mongoose = require('mongoose'); // Ensure mongoose is imported
class AcademicStageController {
    // Create Academic Stage
    async createAcademicStage(req, res) {
        try {
            const { name, years } = req.body;



            // Validate and cast years to ObjectId
            const castedYears = years.map((year) => {
                if (!mongoose.Types.ObjectId.isValid(year)) {
                    throw new Error(`Invalid ObjectId: ${year}`);
                }
                return new mongoose.Types.ObjectId(year);
            });

            const academicStage = await AcademicStageService.createAcademicStage({ name, years: castedYears });
            return res.status(201).json({
                message: 'Academic Stage created successfully',
                academicStage,
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: error.message || 'Error creating academic stage' });
        }
    }

    // Get All Academic Stages
    async getAllAcademicStages(req, res) {
        try {
            const academicStages = await AcademicStageService.getAllAcademicStages();
            res.status(200).json({
                message: 'Academic Stages retrieved successfully',
                academicStages,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message || 'Failed to fetch academic stages' });
        }
    }

    // Get Academic Stage by ID
    async getAcademicStageById(req, res) {
        try {
            const { id } = req.params;
    
            // Validate that the ID is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    message: 'Invalid ID format',
                });
            }
    
            const academicStage = await AcademicStageService.getAcademicStageById(id);
    
            if (!academicStage) {
                return res.status(404).json({
                    message: 'Academic Stage not found',
                });
            }
    
            res.status(200).json({
                message: 'Academic Stage retrieved successfully',
                academicStage,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: error.message || 'Failed to fetch academic stage',
            });
        }
    }

    // Update Academic Stage
    async updateAcademicStage(req, res) {
        try {
            const { id } = req.params;
            const { name, years } = req.body;

            if (name && !['Primary', 'Preparatory', 'Secondary'].includes(name)) {
                return res.status(400).json({ message: 'Invalid academic stage name' });
            }

            const updatedAcademicStage = await AcademicStageService.updateAcademicStage(id, { name, years });

            if (!updatedAcademicStage) {
                return res.status(404).json({ message: 'Academic Stage not found' });
            }

            res.status(200).json({
                message: 'Academic Stage updated successfully',
                academicStage: updatedAcademicStage,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message || 'Failed to update academic stage' });
        }
    }

    // Delete Academic Stage
    async deleteAcademicStage(req, res) {
        try {
            const { id } = req.params;

            const deletedAcademicStage = await AcademicStageService.deleteAcademicStage(id);

            if (!deletedAcademicStage) {
                return res.status(404).json({ message: 'Academic Stage not found' });
            }

            res.status(200).json({
                message: 'Academic Stage deleted successfully',
                academicStage: deletedAcademicStage,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message || 'Failed to delete academic stage' });
        }
    }
}

module.exports = new AcademicStageController();
