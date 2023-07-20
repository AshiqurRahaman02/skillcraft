const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  subscribedChannel: {
    type: [String],
    default: [],
  },
  subscribers: {
    type: Number,
    default: 0,
  },
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VideoModel',
    default: [],
  }],
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseModel',
    default: [],
  }],
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
