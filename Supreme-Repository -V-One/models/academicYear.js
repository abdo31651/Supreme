const mongoose = require('mongoose');

const AcademicYearSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const academicYear = mongoose.model('academicYear', AcademicYearSchema);

module.exports = academicYear;
