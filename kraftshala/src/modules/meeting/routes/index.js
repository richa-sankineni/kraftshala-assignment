const express = require("express");
const router = express.Router();
const meetingController = require("../interface/meetingController");


router.post("/", (req, res) => meetingController.createMeeting(req, res));


router.get("/", (req, res) => meetingController.getMeetings(req, res));

router.get("/:id", (req, res) => meetingController.getMeeting(req, res));


router.put("/:id", (req, res) => meetingController.updateMeeting(req, res));


router.delete("/:id", (req, res) => meetingController.deleteMeeting(req, res));

module.exports = router;
