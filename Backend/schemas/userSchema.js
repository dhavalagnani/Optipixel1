const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    // maxlength: 20
  },
  verified: {
    type: Boolean,
    // default: true,
  },
  img_count: {
    type: Number,
  },
  recent: {
    type: Array,
  },
},
{
  timestamps: true
});

module.exports = model("users", UserSchema);