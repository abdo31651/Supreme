const AcademicYearServices = require("../services/academicYearService");

class AcademicYearController {
    // Create a new Academic Year
    async createAcademicYear(req, res) {
        try {
            const { name } = req.body;


            // Call the service directly
            const newAcademicYear = await AcademicYearServices.createacademicYear({ name });

            res.status(201).json({
                message: 'Academic Year created successfully',
                academicYear: {
                    id: newAcademicYear._id,
                    name: newAcademicYear.name,
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: error.message || 'An error occurred while creating the academic year'
            });
        }
    }

    // Fetch all academic years
    async getAllAcademicYears(req, res) {
        try {
            const academicYears = await AcademicYearServices.getAllAcademicYears();
            res.status(200).json({
                message: 'Fetched all academic years successfully',
                academicYears,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: error.message || 'An error occurred while fetching academic years'
            });
        }
    }

    // Fetch a specific academic year by ID
    async getAcademicYearById(req, res) {
        try {
            const { id } = req.params;
            const academicYear = await AcademicYearServices.getAcademicYearById(id);

            if (!academicYear) {
                return res.status(404).json({ message: 'Academic Year not found' });
            }

            res.status(200).json({
                message: 'Fetched academic year successfully',
                academicYear,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: error.message || 'An error occurred while fetching the academic year'
            });
        }
    }

    // Update an academic year
    async updateAcademicYear(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            //if (!['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'].includes(name)) {
            //    return res.status(400).json({ message: 'Invalid academic year name' });
            //}

            const updatedAcademicYear = await AcademicYearServices.updateAcademicYear(id, { name });

            if (!updatedAcademicYear) {
                return res.status(404).json({ message: 'Academic Year not found' });
            }

            res.status(200).json({
                message: 'Academic Year updated successfully',
                academicYear: updatedAcademicYear,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: error.message || 'An error occurred while updating the academic year'
            });
        }
    }

    // Delete an academic year
    async deleteAcademicYear(req, res) {
        try {
            const { id } = req.params;
            const deletedAcademicYear = await AcademicYearServices.deleteAcademicYear(id);

            if (!deletedAcademicYear) {
                return res.status(404).json({ message: 'Academic Year not found' });
            }

            res.status(200).json({
                message: 'Academic Year deleted successfully',
                academicYear: deletedAcademicYear,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: error.message || 'An error occurred while deleting the academic year'
            });
        }
    }
}

module.exports = new AcademicYearController();
