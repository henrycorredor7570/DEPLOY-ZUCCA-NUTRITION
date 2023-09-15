const { Router } = require("express");
const { createSession } = require("../controllers/paymentController.js");

const paymentRouter = Router();

paymentRouter.post(
  "/",
  createSession
); /* quiere decir que vamos a llamar una ruta paa que el usuario pueda empeza<r a pagar, es decir va a generar la orden de compra viendo la ventana */
paymentRouter.get("/success", (req, res) =>
  res.redirect("/Success.jsx")
); /* ruta para cuando la operacion haya salido exitosa y redireccione a la ruta success.html */
paymentRouter.get("/cancel", (req, res) =>
  res.redirect("/Cancel.jsx")
); /* ruta para cuando la operacion haya salido maly redireccione a la ruta cancel.html  */

module.exports = paymentRouter;
