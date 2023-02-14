const CartManager = require("../domain/CartManager");
const path = require("path");



postAddCart = async (req,res) =>{
    const products = req.body;
    const directory = path.join(`${__dirname}/../BD/carts.json`);
    const cartManager = new CartManager.CartManager(directory);
    const {status,ok, message} = await cartManager.addCart(products);

    return res.status(status).json({
      status,
      ok,
      message
    });

}

getCartById = async (req, res) => {
    const cid = req.params.cid;
  
    const directory = path.join(`${__dirname}/../BD/carts.json`);
    const cartManager = new CartManager.CartManager(directory);
  
    try{
      let cart_id = Number(cid);
  
      const cart = await cartManager.getCartById(cart_id);

     
  
      return res.status(200).json({
          ok: true,
          message: `Cart`,
          cart,
      });
  
    } catch (error) {
          return res.status(500).json({
              ok: false,
              message: `Error processing the information`,
            });
        }
    
} 

postProductInCart = async (req, res) =>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const product = req.body;

    try{
      const directory = path.join(`${__dirname}/../BD/carts.json`);
      const cartManager = new CartManager.CartManager(directory);
    
   
      let cart_id = Number(cid);
      let product_id = Number(pid);
  
      const cart = await cartManager.addProductInCart(cart_id, product_id,product);
  
      return res.status(200).json({
          ok: true,
          message: `Cart`,
          cart,
      });
  
    } catch (error) {
          return res.status(500).json({
              ok: false,
              message: `Error processing the information`,
            });
        }
}

getCarts = async (req,res) =>{
  
  const directory = path.join(`${__dirname}/../BD/carts.json`);
  const cartManager = new CartManager.CartManager(directory);

  try {

      const listaCarts = await cartManager.getCarts();

      return res.status(200).json({
        ok: true,
        message: `list of carts`,
        listaCarts,
      });

    } catch (error) {
      return res.status(500).json({
          ok: true,
          message: `Error processing the information`
        });
    }
}

module.exports ={
    postAddCart,
    getCartById,
    postProductInCart,
    getCarts
}