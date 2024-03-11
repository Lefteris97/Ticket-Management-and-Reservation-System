const router = require('express').Router()
const eventsController = require('../controllers/eventsController')
const verifyToken = require('../utils/verifyToken')
const verifyRoles = require('../utils/verifyRoles')

//CREATE
router.post("/", verifyToken, verifyRoles('admin', 'tc'), eventsController.createNewEvent);

//GET   
router.get("/:id", eventsController.getEventById);

//GET ALL
router.get("/", eventsController.getAllEvents); 

//UPDATE
router.put("/:id", verifyToken, verifyRoles('admin', 'tc'), eventsController.updateEvent);

//DELETE
router.delete("/:id", verifyToken, verifyRoles('admin', 'tc'), eventsController.deleteEvent);

module.exports = router