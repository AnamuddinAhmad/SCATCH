const express = require("express");
const router = express.Router();
const upload = require("../config/multer-Config");
const productModel = require("../models/product-model");

//Ceating products
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    let product = await productModel.create({
      image: req.file.buffer,
      name: name,
      price: price,
      discount: discount,
      bgcolor: bgcolor,
      panelcolor: panelcolor,
      textcolor: textcolor,
    });
    req.flash("success","Product created Successfully");
    res.redirect("/owners/admin");
  } catch (err) {
    return res.send(err.message);
  }
});

module.exports = router;
