const mongoose = require("mongoose");

let ownerSchema = mongoose.Schema({
  fullname: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: String,
  password: String,
  product: {
    type: Array,
    deaful: [],
  },
  picture: String,
  gstin: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("owner", ownerSchema);
