// const router = require('express').Router()
// const db = require('../database')
// const userController = require('../controllers/userController')
// const { verifyToken, verifyUser, verifyAdmin, verifyTicketCollector } = require('../utils/verifyToken');

// //GET
// router.get("/:id", verifyUser, userController.getUserById);

// //GET ALL
// router.get("/", verifyAdmin, userController.getAllUsers);

// //UPDATE
// router.put("/:id", verifyUser, userController.updateUser);

// //DELETE
// router.delete("/:id", verifyAdmin, userController.deleteUser);

// module.exports = router

const router = require('express').Router()
const userController = require('../controllers/userController')
const verifyToken = require('../utils/verifyToken')

//GET
router.get("/:id", userController.getUserById);

//GET ALL
router.get("/", userController.getAllUsers);

//UPDATE
router.put("/:id", userController.updateUser);

//DELETE
router.delete("/:id", userController.deleteUser);

module.exports = router