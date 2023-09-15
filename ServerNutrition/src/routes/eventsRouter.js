const { Router } = require("express");
const eventsRouter = Router();

const { createEventHandler, deleteEventHandler, updateEventHandler, getEventByIdHandler, getAllEventsHandler } = require("../handlers/eventHandler");

eventsRouter.post("/", createEventHandler);
eventsRouter.delete("/:id", deleteEventHandler);
eventsRouter.put("/:id", updateEventHandler);
eventsRouter.get("/:id", getEventByIdHandler);
eventsRouter.get("/", getAllEventsHandler);

module.exports = eventsRouter;