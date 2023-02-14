const { Router } = require("express");

const middlewareCarts = require("../middlewares/carts");
const CartsControllers = require("../controllers/carts");

const router = Router();

router.post(`/`,middlewareCarts.mdlAddCart, CartsControllers.postAddCart);
router.post("/:cid/product/:pid",middlewareCarts.mdlProductInCart, CartsControllers.postProductInCart);  
router.get(`/:cid`,middlewareCarts.mdlGetCartById, CartsControllers.getCartById);
router.get(`/`, CartsControllers.getCarts);

module.exports = router;