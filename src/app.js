const express = require("express");
const productsRoutes = require("./routes/products");
const cartsRoutes = require("./routes/carts");

const PORT = 8080;

const app = express();

const BASE_PREFIX = "api";

app.use(express.json()); // transforme el body y lo podamos usar en req.body, sin esto no podemos ver el req.body
app.use(express.urlencoded({ extended: true })); // procesar req.body y los req.query, sino se agrega no podremos tomar los parametros de la url del request, req.query
app.use(`/${BASE_PREFIX}/products`, productsRoutes);
app.use(`/${BASE_PREFIX}/carts`, cartsRoutes);


app.listen(PORT, () => {
  console.log(`API RUNNING EN EL PORT: ${PORT}`);
});
