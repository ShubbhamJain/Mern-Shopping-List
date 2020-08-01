let mongoose = require("mongoose");

let Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date().toString(),
  },
});

const ItemModel = mongoose.model("item", ItemSchema);

module.exports = ItemModel;
