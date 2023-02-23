const { Router } = require("express");
const ProductControllers = require("../controllers/products");

const router = Router();


router.get("/",ProductControllers.getProductView);  


module.exports = router;