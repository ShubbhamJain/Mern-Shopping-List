let mongoose = require("mongoose");

let Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  registeed_date: {
    type: Date,
    default: new Date().toString(),
  },
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
