const AcademicStageModel = require('../models/academicStage');

class AcademicStageService {
    // [1] Create Academic Stage
    async createAcademicStage(data) {
        const academicStage = new AcademicStageModel(data);
        return await academicStage.save();
    }

    // [2] Get All Academic Stages
    async getAllAcademicStages() {
        return await AcademicStageModel.find();
    }

    // [3] Get Academic Stage by ID
    async getAcademicStageById(id) {
        return await AcademicStageModel.findById(id);
    }

    // [4] Update Academic Stage by ID
    async updateAcademicStage(id, data) {
        return await AcademicStageModel.findByIdAndUpdate(id, data, { new: true });
    }

    // [5] Delete Academic Stage by ID
    async deleteAcademicStage(id) {
        return await AcademicStageModel.findByIdAndDelete(id);
    }
}

module.exports = new AcademicStageService();
