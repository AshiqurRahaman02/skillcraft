const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  videoURL: {
    type: String,
    required: true,
  },
  thumbnailURL: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [{
    type: String,
  }],
  adminID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  creatorName: {
    type: String,
    required: true,
  },
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseModel',
    default: null,
  },
});

const VideoModel = mongoose.model('Video', videoSchema);

module.exports = VideoModel;
