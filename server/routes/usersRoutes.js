const router = require('express').Router()
const userController = require('../controllers/userController')
const verifyToken = require('../utils/verifyToken')
const verifyRoles = require('../utils/verifyRoles')

//GET
router.get("/:id", userController.getUserById);

//GET ALL
router.get("/", verifyToken, verifyRoles('admin'), userController.getAllUsers);

//UPDATE
router.put("/:id", verifyToken, verifyRoles('admin'), userController.updateUser);

//DELETE
router.delete("/:id", verifyToken, verifyRoles('admin'), userController.deleteUser);

module.exports = router