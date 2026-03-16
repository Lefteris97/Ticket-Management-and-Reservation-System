const router = require('express').Router()
const ticketsController = require('../controllers/ticketsController')
const verifyToken = require('../utils/verifyToken')
const verifyRoles = require('../utils/verifyRoles')

//CREATE
router.post("/", ticketsController.createNewTicket);

//GET
router.get("/:id", ticketsController.getTicketById);
router.get("/attendees/:id", ticketsController.getTotalAttendeesByEventId);
router.get("/user/:user_id/event/:event_id", ticketsController.getUserTicketByEventId);

//GET ALL
router.get("/", verifyToken, verifyRoles('admin'), ticketsController.getAllTickets);

//UPDATE
router.put("/:id", verifyToken, verifyRoles('admin'), ticketsController.updateTicket);

//DELETE
router.delete("/:id", verifyToken, verifyRoles('admin'), ticketsController.deleteTicket);

module.exports = router