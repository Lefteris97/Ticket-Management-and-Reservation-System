const router = require('express').Router()
const eventsController = require('../controllers/eventsController')

//CREATE
router.post("/", eventsController.createNewEvent);

//GET
router.get("/:id", eventsController.getEventById);

//GET ALL
router.get("/", eventsController.getAllEvents);

//UPDATE
router.put("/:id", eventsController.updateEvent);

//DELETE
router.delete("/:id", eventsController.deleteEvent);

module.exports = router