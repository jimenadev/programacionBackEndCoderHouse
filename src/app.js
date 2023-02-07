const { ProductManager } = require("./ProductManager");
const path = require("path");
const express = require("express");

const PORT = 8500;
const app = express();

app.use(express.json()); // transforme el body y lo podamos usar en req.body
app.use(express.urlencoded({ extended: true })); // procesar req.body y los req.query




app.get(`/products`, async (req, res) => {
    const limit = req.query.limit;
    
    const directory = path.join(`${__dirname}/BD/products.json`);
    const productManager = new ProductManager(directory);
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
              message: `limit debe ser un valor numérico ${limit}`,
              queryParams: req.query,
            });

          }

          const listaProducts = await productManager.getProductsLimit(limit);

          return res.status(200).json({
            ok: true,
            message: `lista de productos`,
            listaProducts,
          });
        }

       
        
      } catch (error) {
        return res.status(500).json({
            ok: true,
            message: `Error al procesar la información`,
            queryParams: req.query,
          });
      }
    
    

});

app.get(`/products/:pid`, async (req, res) => {
  const pid = req.params.pid;

  if (isNaN(pid)) {
    return res.status(400).json({
      ok: false,
      message: `El id es un valor inválido ${pid}`,
    });
  }

  const directory = path.join(`${__dirname}/BD/products.json`);
    const productManager = new ProductManager(directory);

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
  

});


app.listen(PORT, () => {
  console.log(`API RUNNING`);
});
