const ProductManager = require("../DAO/managerMongoDB/ProductManager");
const productManager = new ProductManager.ProductManager();
postAddProduct = async (req,res) =>{

  const product = req.body;
  const {status,ok, message} = await productManager.addProduct(product);

  return res.status(status).json({
    status,
    ok,
    message
  });

}


getProduct = async (req,res) =>{

    const limit = req.query.limit;

    try {
        if (limit === undefined){
          const listaProducts = await productManager.getProducts();

          return res.status(200).json({
            ok: true,
            message: `lista de productos`,
            listaProducts,
          });
    
        }else{

          if (isNaN(limit)) {
            return res.status(400).json({
              ok: true,
              message: `limit debe ser un valor numérico (${limit})`,
              queryParams: req.query,
            });

          }

          const listaProducts = await productManager.getProductsLimit(limit);

          return res.status(200).json({
            ok: true,
            message: `list of products`,
            listaProducts,
          });
        }

       
        
      } catch (error) {
        return res.status(500).json({
            ok: true,
            message: `Error processing the information`,
            queryParams: req.query,
          });
      }
}

getProductById = async (req, res) => {
    const pid = req.params.pid;
  
    try{
      
      const product = await productManager.getProductById(pid);

      return res.status(200).json({
          ok: true,
          message: `Producto`,
          product,
      });
  
    } catch (error) {
          return res.status(500).json({
              ok: false,
              message: `Error al procesar la información`,
            });
        }
    
} 


putUpdateProduct = async (req, res) => {
    const  id  = req.params.pid;
    const product = req.body;
    const {status,ok, message}  = await productManager.updateProduct(id,product);

    return res.status(status).json({
      status,
      ok,
      message
    });


}


deleteProduct = async (req, res) => {
    const pid = req.params.pid;

    const {status,ok, message}  = await productManager.deleteProduct(pid);

    return res.status(status).json({
      status,
      ok,
      message
    });

  }




module.exports ={
    postAddProduct,
    getProduct,
    getProductById,
    deleteProduct,
    putUpdateProduct
}