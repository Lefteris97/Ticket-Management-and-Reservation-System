const router = require('express').Router()
const ticketsController = require('../controllers/ticketsController')


//CREATE
router.post("/", ticketsController.createNewTicket);

//GET
router.get("/:id", ticketsController.getTicketById);
router.get("/attendees/:id", ticketsController.getTotalAttendeesByEventId);
router.get("/user/:user_id/event/:event_id", ticketsController.getUserTicketByEventId);

//GET ALL
router.get("/", ticketsController.getAllTickets);

//UPDATE
router.put("/:id", ticketsController.updateTicket);

//DELETE
router.delete("/:id", ticketsController.deleteTicket);

module.exports = router