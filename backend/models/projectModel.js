const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    genre: { type: String, required: [true, 'Please select a genre'] },
    name: { type: String, required: [true, 'Please add a name'] },
    description: {
      type: String,
      required: [true, 'Please add a project description'],
    },
    img: String,
    userImg: String,
    username: String,
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);
