// const router = require('express').Router()
// const eventsController = require('../controllers/eventsController')
// const { verifyToken, verifyUser, verifyAdmin, verifyTicketCollector } = require('../utils/verifyToken');


// //CREATE
// router.post("/", verifyAdmin, eventsController.createNewEvent);

// //GET
// router.get("/:id", eventsController.getEventById);

// //GET ALL
// router.get("/", eventsController.getAllEvents);

// //UPDATE
// router.put("/:id", verifyAdmin, eventsController.updateEvent);

// //DELETE
// router.delete("/:id", verifyAdmin, eventsController.deleteEvent);

// module.exports = router


//2nd Try
const router = require('express').Router()
const eventsController = require('../controllers/eventsController')
const verifyToken = require('../utils/verifyToken')
const verifyRoles = require('../utils/verifyRoles')


//CREATE
router.post("/", eventsController.createNewEvent);
// router.post("/", verifyRoles('admin'), eventsController.createNewEvent);
// router.post("/", verifyToken, eventsController.createNewEvent);

//GET   
router.get("/:id", eventsController.getEventById);

//GET ALL
router.get("/", eventsController.getAllEvents);

//UPDATE
router.put("/:id", eventsController.updateEvent);

//DELETE
router.delete("/:id", eventsController.deleteEvent);
// router.delete("/:id", verifyRoles('admin'), eventsController.deleteEvent);

module.exports = router