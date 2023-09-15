const { Router } = require("express");
const cloudinaryRouter = Router();

const { cloudinaryHandler } = require("../handlers/cloudinaryHandler");

cloudinaryRouter.get("/", cloudinaryHandler);

module.exports = cloudinaryRouter;