const express = require("express");
const cors = require("cors");
const displayRoutes = require("express-routemap");
const handlebars = require("express-handlebars");
const { Server } = require("socket.io");

const corsConfig = require("./config/cors.config");
const { mongoDBconnection } = require("./db/mongo.config");
const { PORT, NODE_ENV } = require('./config/config');

const {addMessage} = require('./controllers/messages')

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
    this.initSocket();
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
    this.app.use(express.static(`${__dirname}/public`));
  }

  /**
   * initializeRoutes
   */
  initializeRoutes(routes) {
    routes.forEach((route) => {
      this.app.use(`/`, route.router);
    });
  }

  /**
   * listen
   */
  listen() {
   return this.app.listen(this.port, () => {
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

  initSocket(server){
    const io = new Server(server);
    const messages = [];
      io.on("connection", (socket) => {
        console.log("Socket connected");

        // message channel
        socket.on("message", (data) => {
          console.log("🚀 ~ file: app.js:35 ~ socket.on ~ data", data);
          addMessage(data);
          messages.push(data);
          console.log("🚀 ~ file: app.js:37 ~ socket.on ~ messages", messages);
          io.emit("messageLogs", messages);
        });

        // authenticated channel
        socket.on("authenticated", (data) => {
          console.log("🚀 ~ file: app.js:39 ~ socket.on ~ data", data);
          socket.broadcast.emit("newUserConnected", data);
        });
      });
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
