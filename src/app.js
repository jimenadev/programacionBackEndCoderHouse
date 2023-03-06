const express = require("express");
const cors = require("cors");
const displayRoutes = require("express-routemap");
const handlebars = require("express-handlebars");

const corsConfig = require("./config/cors.config");
const { mongoDBconnection } = require("./db/mongo.config");
const { PORT, NODE_ENV } = require('./config/config');

const API_VERSION = "v1";

class App {
  app;
  env;
  port;
  server;

  constructor(routes) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = Number(PORT) || 5000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initHandlebars();
  }

  /**
   * getServer
   */
  getServer() {
    return this.app;
  }

  closeServer(done) {
    this.server = this.app.listen(this.port, () => {
      done();
    });
  }

  /**
   * connectToDatabase
   */
  async connectToDatabase() {
    // TODO: Inicializar la conexion
    await mongoDBconnection();
  }

  initializeMiddlewares() {
    this.app.use(cors(corsConfig));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use("/static", express.static(`${__dirname}/public`));
  }

  /**
   * initializeRoutes
   */
  initializeRoutes(routes) {
    routes.forEach((route) => {
      this.app.use(`/api/${API_VERSION}`, route.router);
    });
  }

  /**
   * listen
   */
  listen() {
    this.app.listen(this.port, () => {
      displayRoutes(this.app);
      console.log(`=================================`);
      console.log(`======= ENV: ${this.env} =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    });
  }

  initHandlebars() {
    this.app.engine("handlebars", handlebars.engine());
    this.app.set("views", __dirname + "/views");
    this.app.set("view engine", "handlebars");
  }
}

module.exports = App;









/*const express = require("express");
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
});*/
