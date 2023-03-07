const { Router } = require("express");

class ViewsRoutes {
  path = "/views";
  router = Router();

  constructor() {
    this.initViewsRoutes();
  }

  initViewsRoutes() {
    this.router.get(`/chat`, async (req, res) => {
      res.render("chat");
    });

   /* this.router.get(`${this.path}/carts`, async (req, res) => {
      let carts = [];
      res.render("carts", { carts });
    });*/
  }
}

module.exports = ViewsRoutes;
