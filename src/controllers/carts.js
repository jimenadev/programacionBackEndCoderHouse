const CartManager = require("../DAO/managerMongoDB/CartManager");
const cartManager = new CartManager.CartManager();


postAddCart = async (req,res) =>{

  try{
      const products = req.body;

      const {status,ok, message} = await cartManager.addCart(products);

      return res.status(status).json({
        status,
        ok,
        message
      });
    }catch{
      return res.status(500).json({
        ok: false,
        message: `Error processing the information`,
      });
    }
  }
  

  
getCartById = async (req, res) => {
    const cid = req.params.cid;
  
    try{
  
      const cart = await cartManager.getCartById(cid);

      if(cart.status === 400){
          return res.status(cart.status).json({
            ok: cart.ok,
            message: cart.message,
        });
      }

      return res.status(200).json({
        ok: true,
        message: "Cart",
        cart
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
  
      const cart = await cartManager.addProductInCart(cid, pid,product);
  
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