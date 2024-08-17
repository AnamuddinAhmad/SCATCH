const mongoose = require("mongoose");
const config= require("config");
const dbgr = require("debug")("development:mongoose");
//Runing command for debuger
//set DEBUG=development:* delvelopment is a varila whichis consideer as a .env veriable
//Other wise you can try this set process.env.NODE_ENV=development

mongoose
  .connect(`${config.get("MONGODB_URI")}/scatch`)
  .then(function () {
    dbgr("Connected");
  })
  .catch(function (err) {
    console.log(err);
  });

module.exports = mongoose.connection;
