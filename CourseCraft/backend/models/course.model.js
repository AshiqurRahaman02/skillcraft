const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  thumbnailURL: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VideoModel',
    default: [],
  }],
  category: {
    type: String,
    required: true,
  },
  adminID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  creatorName: {
    type: String,
    required: true,
  },
});

const CourseModel = mongoose.model('Course', courseSchema);

module.exports = CourseModel;
