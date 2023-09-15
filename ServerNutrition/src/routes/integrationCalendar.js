const { Router } = require('express');
const { getAllEvents, saveEvent, createCalendar } = require('../handlers/calendarHandlers');
const calendarRoute = Router();

calendarRoute.get("/allEvents/calendar", getAllEvents);
calendarRoute.post("/createEvent", saveEvent);
calendarRoute.post("/createCalendar", createCalendar);

module.exports = calendarRoute;