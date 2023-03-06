const { Router } = require("express");

const { uploader } = require("../middlewares/upload");
const middlewareProducts = require("../middlewares/products");
const ProductControllers = require("../controllers/products");

class ProductsRoutes {
  path = "/products";
  router = Router();

  constructor(){
    this.initProductsRoutes();
  }

  initProductsRoutes(){
    this.router.post(`${this.path}`,middlewareProducts.mdlAddProduct, uploader.array("thumbnails"), ProductControllers.postAddProduct);
    this.router.get(`${this.path}`,ProductControllers.getProduct); 
    this.router.get(`${this.path}/:pid`,middlewareProducts.mdlGetProductById, ProductControllers.getProductById); 
    this.router.delete(`${this.path}/:pid`,middlewareProducts.mdlDeleteProduct, ProductControllers.deleteProduct);
    this.router.put(`${this.path}/:pid`,middlewareProducts.mdlUpdateProduct, ProductControllers.putUpdateProduct);
  }



}

module.exports = ProductsRoutes;
