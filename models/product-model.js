const mongoose = require("mongoose");

let productSchema = mongoose.Schema({
  image: Buffer,
  name: String,
  price: Number,
  discount: {
    type: Number,
    deatful: 0,
  },
  bgcolor: String,
  panelcolor: String,
  textcolor: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("product", productSchema);
