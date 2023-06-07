const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    genre: {
      type: String,
      required: [true, 'Please select a genre'],
      min: 2,
      max: 20,
    },
    name: {
      type: String,
      required: [true, 'Please add a name'],
      min: 2,
      max: 20,
    },
    img: String,
    userImg: String,
    username: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);
