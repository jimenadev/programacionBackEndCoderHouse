const ProductManager = require("../domain/ProductManager");
const path = require("path");

getProductView = async(req, res) => {

  const limit = req.query.limit;
    
    const directory = path.join(`${__dirname}/../BD/products.json`);
    const productManager = new ProductManager.ProductManager(directory);

    try {
          const listaProducts = await productManager.getProducts();
          res.render("index", { products: listaProducts.products });
        
      } catch (error) {
        return res.status(500).json({
            ok: true,
            message: `Error processing the information`,
            queryParams: req.query,
          });
      }

}


getProduct = async (req,res) =>{

    const limit = req.query.limit;
    
    const directory = path.join(`${__dirname}/../BD/products.json`);
    const productManager = new ProductManager.ProductManager(directory);

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
  
    const directory = path.join(`${__dirname}/../BD/products.json`);
    const productManager = new ProductManager.ProductManager(directory);
  
    try{
      const id = Number(pid);
  
      const product = await productManager.getProductById(id);
  
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

postAddProduct = async (req,res) =>{
    const product = req.body;
    const directory = path.join(`${__dirname}/../BD/products.json`);
    const productManager = new ProductManager.ProductManager(directory);
    const {status,ok, message} = await productManager.addProduct(product);

    return res.status(status).json({
      status,
      ok,
      message
    });

}

putUpdateProduct = async (req, res) => {
    const  id  = req.params.pid;
    const product = req.body;
    const directory = path.join(`${__dirname}/../BD/products.json`);
    const productManager = new ProductManager.ProductManager(directory);
    const {status,ok, message}  = await productManager.updateProduct(Number(id),product);

    return res.status(status).json({
      status,
      ok,
      message
    });


}

deleteProduct = async (req, res) => {
    const pid = req.params.pid;

    const id = Number(pid);
  
    const directory = path.join(`${__dirname}/../BD/products.json`);
    const productManager = new ProductManager.ProductManager(directory);
    const {status,ok, message}  = await productManager.deleteProduct(id);

    return res.status(status).json({
      status,
      ok,
      message
    });

  }




module.exports ={
    getProduct,
    getProductById,
    postAddProduct,
    putUpdateProduct,
    deleteProduct,
    getProductView
}