const mongoose = require("mongoose");
const validator = require("validator");

const usermessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  phone: {
    type: Number,
    minlength:10,
    maxlength: 10,
    required: true,
  },
  message: {
    type: String,
    required: true,
    minlength: 3
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

//we need a collection 
const User = new mongoose.model("Usermessage", usermessageSchema);

module.exports = User;

