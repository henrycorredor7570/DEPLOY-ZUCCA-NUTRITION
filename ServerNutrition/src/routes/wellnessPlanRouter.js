const { Router } = require("express");
//Handlers
const {
  getOneWellnessPlan,
  createWellnessPlan,
  updateWellnessPlan,
  destroyWellnessPlan,
} = require("../handlers/wellnessPlanHandler.js");
const wellnessPlanRouter = Router();

wellnessPlanRouter.get("/:id", getOneWellnessPlan);
wellnessPlanRouter.post("/create", createWellnessPlan);
wellnessPlanRouter.put("/update/:id", updateWellnessPlan);
wellnessPlanRouter.delete("/destroy/:id", destroyWellnessPlan);

module.exports = wellnessPlanRouter;
