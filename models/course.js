
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    subject: {
      type: String,
      required: true,
      enum: ['Math', 'Science', 'English', 'History', 'Geography'],
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    academicStage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'academicStage',
      required: true,
    },
    academicYear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'academicYear',
      required: true,
    },
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'lesson',
      },
    ],
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
