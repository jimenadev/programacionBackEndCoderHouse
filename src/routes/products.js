const { Router } = require("express");
const { uploader } = require("../middlewares/upload");
const middlewareProducts = require("../middlewares/products");
const ProductControllers = require("../controllers/products");

const router = Router();

router.get("/",ProductControllers.getProduct);  
router.get(`/:pid`,middlewareProducts.mdlGetProductById, ProductControllers.getProductById);
router.post(`/`,middlewareProducts.mdlAddProduct, uploader.array("thumbnails"), ProductControllers.postAddProduct);
router.put(`/:pid`,middlewareProducts.mdlUpdateProduct, ProductControllers.putUpdateProduct);
router.delete(`/:pid`,middlewareProducts.mdlDeleteProduct, ProductControllers.deleteProduct);

module.exports = router;
  