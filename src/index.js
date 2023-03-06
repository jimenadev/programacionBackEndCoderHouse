const App = require("./app");
const BaseRoute = require("./routes/base");
const ProductsRoutes = require("./routes/products");
const CartsRoutes = require("./routes/carts");
const ViewsRoutes = require("./routes/views");

const app = new App([
  new BaseRoute(),
  new ProductsRoutes(),
  new CartsRoutes(),
 // new ViewsRoutes(),
]);

app.listen();
