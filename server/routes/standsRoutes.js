// const router = require('express').Router()
// const standsController = require('../controllers/standsController')
// const { verifyToken, verifyUser, verifyAdmin, verifyTicketCollector } = require('../utils/verifyToken');


// //CREATE
// router.post("/", verifyAdmin, standsController.createNewStand);

// //GET
// router.get("/:id", standsController.getStandById);

// //GET ALL
// router.get("/", standsController.getAllStands);

// //UPDATE
// router.put("/:id", verifyAdmin, standsController.updateStand);

// //DELETE
// router.delete("/:id", verifyAdmin, standsController.deleteStand);

// module.exports = router

const router = require('express').Router()
const standsController = require('../controllers/standsController')


//CREATE
router.post("/", standsController.createNewStand);

//GET
router.get("/:id", standsController.getStandById);

//GET ALL
router.get("/", standsController.getAllStands);

//UPDATE
router.put("/:id", standsController.updateStand);

//DELETE
router.delete("/:id", standsController.deleteStand);

module.exports = router