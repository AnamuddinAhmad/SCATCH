//Requireing npm packages
const bcrypt = require("bcrypt");

//Requireing Database
const userModel = require("../models/user-model");

//Requireing utils
const { genrateToken } = require("../utils/genrateToken");


//Register routes
module.exports.registerUser = async function (req, res) {
  let { email, password, fullname } = req.body;

  //Checking user exist or not.
  let user = await userModel.findOne({ email: email });
  if (user) {
    req.flash("error", "You have already account.");
    return res.redirect("/");
  }

  try {
    //password Encryption
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        //Creating user
        let createdUser = await userModel.create({
          fullname: fullname,
          email: email,
          password: hash,
        });

        //SetingUp cookieparser
        let token = genrateToken(createdUser);
        req.flash("message", "You have registerd Sucessfully");
        res.cookie("token", token);
        res.redirect("/shop");
      });
    });
  } catch (err) {
    res.status(err).send("Something Went worng");
  }
};

//Login User
module.exports.loginUser = async function (req, res) {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email: email });

  //if user not found
  if (!user) {
    req.flash("error", "Email Password Incorrect.");
    return res.redirect("/");
  }

  //if user avilable
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = genrateToken(user);
      res.cookie("token", token);
      res.redirect("/shop");
    } else {
      req.flash("error", "Email Password Incorrect.");
      return res.redirect("/");
    }
  });
};

//Logout User
module.exports.logout = function (req, res) {
  res.cookie("token", "");
  res.redirect("/");
};

//User page
module.exports.user = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) {
      req.flash("error", "User not found.");
      return res.redirect("/");
    } else {
      let error = req.flash("error");
      res.render("user.ejs", { user, logedin: true ,error});
    }
  } catch (error) {
    req.flash("error","Somthing went Wrong.");
    return res.redirect("/");
  }
};


//Uploading Profile pic
module.exports.userupload = async function (req, res) {
  const buffer = req.file.buffer;
  await userModel.findOneAndUpdate(
    { email: req.user.email },
    { picture: buffer },
    { new: true }
  );

  res.redirect("/users/profile");
};

module.exports.user;
