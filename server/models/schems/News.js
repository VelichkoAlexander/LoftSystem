const mongoose = require('mongoose');

const Schema = mongoose.Schema
const newsSchema = new Schema({
    text: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    user: {
      id: String,
      firstName: String,
      middleName: String,
      surName: String,
      image: String,
      userName: String,
    },
  },
  {
    timestamps: true
  });

module.exports = mongoose.model('news', newsSchema);