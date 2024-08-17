const express = require("express");
const router = express.Router();

//Requireing utilites
const {
  registerUser,
  loginUser,
  logout,
  user,
  userupload,
} = require("../controllers/authControllers");
const isLogedIn = require("../middlewares/isLogedIn");
const upload = require("../config/multer-Config");

//register routs
router.post("/register", registerUser);

//User routes
router.get("/profile", isLogedIn, user);

//User Upload images
router.post("/userupload", upload.single("image"), isLogedIn, userupload);

//Login routs
router.post("/login", loginUser);

//Logout routs
router.get("/logout", isLogedIn, logout);

module.exports = router;
