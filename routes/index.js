const express = require("express");
const isLogedIn = require("../middlewares/isLogedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const router = express();

//created product
router.get("/", (req, res, next) => {
  let error = req.flash("error");
  res.render("index.ejs", { error, logedin: false });
});

//shop
router.get("/shop", isLogedIn, async function (req, res, next) {
  let user = await userModel.findOne({ email: req.user.email });
  let products = await productModel.find();
  let success = req.flash("success");
  res.render("shop.ejs", { products, success, currentPage: "shop", user });
});

//add to cart
router.get("/addtocart/:productid", isLogedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  user.cart.push(req.params.productid);
  await user.save();
  req.flash("success", "Added to Cart.");
  res.redirect("/shop");
});

// removing product form cart
router.get("/discart/:productid", isLogedIn, async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.user.email });

    // Find the index of the product in the cart
    const productIndex = user.cart.indexOf(req.params.productid);

    // Check if the product exists in the cart
    if (productIndex > -1) {
      // Remove the product from the cart using splice
      user.cart.splice(productIndex, 1);
      await user.save();
      req.flash("success", "Removed from Cart.");
    } else {
      req.flash("success", "Product not found in cart.");
    }

    res.redirect("/cart");
  } catch (error) {
    console.error(error);
    req.flash(
      "success",
      "An error occurred while removing the product from the cart."
    );
    res.redirect("/shop");
  }
});

//show cart
router.get("/cart", isLogedIn, async function (req, res, next) {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");
  const success = req.flash("success");
  let discountamount = 0;
  let totalamount = 0;
  
  user.cart.forEach((product) => {
    discountamount += Number(product.discount);
    totalamount += Number(product.price);
  });
  
  let finalprice = totalamount - discountamount;

  res.render("cart.ejs", { user, success, currentPage: "cart", finalprice,discountamount,totalamount });
});

module.exports = router;
