const router = require('express').Router()
const standsController = require('../controllers/standsController')
const verifyToken = require('../utils/verifyToken')
const verifyRoles = require('../utils/verifyRoles')


//CREATE
router.post("/", verifyToken, verifyRoles('admin'), standsController.createNewStand);

//GET
router.get("/:id", standsController.getStandById);
router.get("/of_event/:eventId", standsController.getStandsByEventId);

//GET ALL
router.get("/", standsController.getAllStands);

//UPDATE
router.put("/:id", verifyToken, verifyRoles('admin'), standsController.updateStand);

//DELETE
router.delete("/:id", verifyToken, verifyRoles('admin'), standsController.deleteStand);

module.exports = router