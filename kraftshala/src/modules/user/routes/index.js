const express = require("express");
const router = express.Router();
const userController = require("../interface/userController");

router.post("/", (req, res) => userController.createUser(req, res));
router.get("/:id", (req, res) => userController.getUser(req, res));
router.get("/", (req, res) => userController.getAllUsers(req, res)); 

module.exports = router;
