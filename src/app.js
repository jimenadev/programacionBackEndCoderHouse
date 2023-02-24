const express = require("express");
const handlebars = require("express-handlebars");
const productsRoutes = require("./routes/products");
const cartsRoutes = require("./routes/carts");
const viewsRoutes = require("./routes/views");
const path = require("path");
const ProductControllers = require("./controllers/products");
const { Server } = require("socket.io");

const PORT = 8080;

const app = express();

const BASE_PREFIX = "api";


// CONFIGURACION DE HANDELBARS
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(`${__dirname}/views`));
app.set("view engine", "handlebars");

//server express
app.use(express.static(`${__dirname}/public`));
app.use(express.json()); // transforme el body y lo podamos usar en req.body, sin esto no podemos ver el req.body
app.use(express.urlencoded({ extended: true })); // procesar req.body y los req.query, sino se agrega no podremos tomar los parametros de la url del request, req.query

//rutas
app.use("/", viewsRoutes);
app.use(`/${BASE_PREFIX}/products`, productsRoutes);
app.use(`/${BASE_PREFIX}/carts`, cartsRoutes);

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Socket connected");

  // message channel
  socket.on("listProducts",async () => {
    const data= await ProductControllers.getProductSocket();
    io.emit("products", data);
  });

  io.emit("messageAll", async () => {
    const data= await ProductControllers.getProductSocket();
    io.emit("products", data);
  });

});



/*app.listen(PORT, () => {
  console.log(`API RUNNING EN EL PORT: ${PORT}`);
});*/
