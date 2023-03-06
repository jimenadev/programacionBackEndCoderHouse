const { Router } = require("express");

const middlewareCarts = require("../middlewares/carts");
const CartsControllers = require("../controllers/carts");

class CartsRoutes {
  path = "/carts";
  router = Router();

  constructor(){
    this.initCartsRoutes();
  }

  initCartsRoutes(){

    this.router.post(`${this.path}`,middlewareCarts.mdlAddCart, CartsControllers.postAddCart);
    this.router.post(`${this.path}/:cid/product/:pid`,middlewareCarts.mdlProductInCart, CartsControllers.postProductInCart);  
    this.router.get(`${this.path}/:cid`,middlewareCarts.mdlGetCartById, CartsControllers.getCartById);
    this.router.get(`${this.path}`, CartsControllers.getCarts);

  }
}

module.exports = CartsRoutes;

