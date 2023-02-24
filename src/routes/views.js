const { Router } = require("express");
const ProductControllers = require("../controllers/products");

const router = Router();


router.get("/",ProductControllers.getProductView);  

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});


module.exports = router;