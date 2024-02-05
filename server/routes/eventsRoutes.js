const router = require('express').Router()
const eventsController = require('../controllers/eventsController')
const { verifyToken, verifyUser, verifyAdmin, verifyTicketCollector } = require('../utils/verifyToken');


//CREATE
router.post("/", verifyAdmin, eventsController.createNewEvent);

//GET
router.get("/:id", eventsController.getEventById);

//GET ALL
router.get("/", eventsController.getAllEvents);

//UPDATE
router.put("/:id", verifyAdmin, eventsController.updateEvent);

//DELETE
router.delete("/:id", verifyAdmin, eventsController.deleteEvent);

module.exports = router