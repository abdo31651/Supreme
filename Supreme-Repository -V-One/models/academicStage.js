const mongoose = require('mongoose');

const AcademicStageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },

    years: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'academicYear',
    }], 

}, {
    timestamps: true, 
});

const academicStage = mongoose.model('academicStage', AcademicStageSchema);

module.exports = academicStage;
