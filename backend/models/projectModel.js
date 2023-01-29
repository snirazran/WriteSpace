const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    genre: { type: String, required: [true, 'Please add a genre value'] },
    title: { type: String, required: [true, 'Please add a type value'] },
    img: String,
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);
