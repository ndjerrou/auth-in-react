const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new Schema({
  email: {
    unique: true,
    type: String,
    minLength: 5,
    maxLength: 255,
  },
  password: {
    type: String,
    minLength: 5,
    maxLength: 1024,
  },
});

userSchema.methods.generateAuthToken = () => {
  return jwt.sign({ _id: this._id }, config.get("CLEF_PRIVEE"));
};

const User = model("User", userSchema);

module.exports = User;
