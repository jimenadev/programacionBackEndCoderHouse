const { Router } = require("express");

class ViewsRoutes {
  path = "/views";
  router = Router();

  constructor() {
    this.initViewsRoutes();
  }

  initViewsRoutes() {
    this.router.get(`${this.path}/products`, async (req, res) => {
      let products = [
        { name: "prueba", lastName: "apellidoPrueba", dni: "12345678" },
      ];
      res.render("products", { products });
    });

    this.router.get(`${this.path}/carts`, async (req, res) => {
      let carts = [];
      res.render("carts", { carts });
    });
  }
}

module.exports = ViewsRoutes;
