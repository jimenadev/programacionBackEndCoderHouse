const { Router } = require("express");

class CartsRoutes {
  path = "/carts";
  router = Router();

  constructor(){
    this.initCartsRoutes();
  }

  initCartsRoutes(){

    this.router.get(`${this.path}`, async(req, res) =>{

    });

    

  }
}

module.exports = CartsRoutes;


/*const { Router } = require("express");

const middlewareCarts = require("../middlewares/carts");
const CartsControllers = require("../controllers/carts");

const router = Router();

router.post(`/`,middlewareCarts.mdlAddCart, CartsControllers.postAddCart);
router.post("/:cid/product/:pid",middlewareCarts.mdlProductInCart, CartsControllers.postProductInCart);  
router.get(`/:cid`,middlewareCarts.mdlGetCartById, CartsControllers.getCartById);
router.get(`/`, CartsControllers.getCarts);

module.exports = router;
*/

