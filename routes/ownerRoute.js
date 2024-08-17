const express = require("express");
const router = express.Router();

//Requireing databse
const ownerMode = require("../models/owner-model");

//Requireing npm packages
const bcrypt = require('bcrypt');
const isLogedIn = require("../middlewares/isLogedIn");
const userModel = require("../models/user-model");


//Creating Owner Routes
//Before create owner make sure NODE_ENV should be development 
//for that command is set NODE_ENV=development
//remember that
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owner = await ownerMode.find();
    if (owner.length > 0) {
      return res.status(503).send("You cant create owner");
    }

    //Destructing
    let {fullname,email,password} = req.body;

    //Encrypting password
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password ,salt ,async (err,hash)=>{
           let createdOwner = await ownerMode.create({
                fullname:fullname,
                email:email,
                password:hash
            });

            //Creating Owner
            res.send(createdOwner).status(201);
        });
    });
  });
};

//Admin routes
router.get("/admin",isLogedIn,async(req,res)=>{
  let user = await userModel.findOne({email:req.user.email});
  let success = req.flash("success");
  res.render("createproducts.ejs",{success,user,currentPage:"Admin"})
});

// router.post("/admin",isLogedIn,(req,res)=>{
//   res.render("createproducts.ejs")
// })

module.exports = router;
