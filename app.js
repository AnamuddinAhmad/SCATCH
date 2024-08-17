//Before starting sever and app
//You must be setup your env value remember that if it not show connected that mean some
//Problem occure here.

//Requireing express app
const express = require("express");
const app = express();

//Requireing npm package
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");

//It will help to get the all enviormental veriavle
require("dotenv").config();

//Requireing Database.
const userModel = require("./models/user-model");
const productModel = require("./models/product-model");
const db = require("./config/mongoose-connection");

//Requireing Routs
const ownerRoute = require("./routes/ownerRoute");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const indexpage = require("./routes/index");

//Setup Middilewares
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

//Setup routs
app.use("/", indexpage);
app.use("/owners", ownerRoute);
app.use("/users", userRoute);
app.use("/products", productRoute);

//App listening port
app.listen(3000);
