const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      required: [true, 'Please select a type'],
      min: 2,
      max: 20,
    },
    name: {
      type: String,
      required: [true, 'Please add a name'],
      min: 2,
      max: 20,
    },
    description: {
      type: String,
      required: [true, 'Please add a post description'],
      min: 2,
      max: 200,
    },
    content: {
      type: String,
      required: [true, 'Please add a post content'],
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
    img: String,
    projectImg: String,
    projectName: String,
    projectGenre: String,
    userImg: String,
    username: String,
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model('Post', postSchema);
