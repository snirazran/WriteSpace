const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a name'],
      min: 2,
      max: 20,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      max: 40,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      min: 6,
    },
    friends: {
      type: Array,
      default: [],
    },
    bio: {
      type: String,
      default: '',
      max: 200,
    },
    img: {
      type: String,
      default: '',
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
