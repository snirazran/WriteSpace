const mongoose = require('mongoose');

const documentSchema = mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    type: { type: String, required: [true, 'Please select a type'] },
    name: { type: String, required: [true, 'Please add a name'] },
    description: {
      type: String,
      required: [true, 'Please add a document description'],
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

module.exports = mongoose.model('Document', documentSchema);
