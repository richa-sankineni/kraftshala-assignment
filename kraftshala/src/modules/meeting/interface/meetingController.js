const meetingService = require("../service/meetingService");
const { CreateMeetingDTO } = require("../dto/meetingDTO");

class MeetingController {
  async createMeeting(req, res) {
    try {
      const dto = new CreateMeetingDTO(req.body);
      const errors = dto.validate();
      if (errors) return res.status(400).json({ errors });

      const meeting = await meetingService.createMeeting(dto);
      res.status(201).json(meeting);
    } catch (err) {
      res.status(err.statusCode || 400).json({ message: err.message });
    }
  }

  async getMeetings(req, res) {
    try {
      const { userId, startDate, endDate } = req.query;
      const filters = {};
      if (userId) filters.userId = Number(userId);
      if (startDate) filters.startDate = new Date(startDate).toISOString();
      if (endDate) filters.endDate = new Date(endDate).toISOString();

      const meetings = await meetingService.getAllMeetings(filters);
      res.json(meetings);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getMeeting(req, res) {
    try {
      const meeting = await meetingService.getMeetingById(req.params.id);
      if (!meeting) {
        return res.status(404).json({ message: "Meeting not found" });
      }
      res.json(meeting);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateMeeting(req, res) {
    try {
      const meeting = await meetingService.updateMeeting(req.params.id, req.body);
      res.json(meeting);
    } catch (err) {
      res.status(err.statusCode || 400).json({ message: err.message });
    }
  }

  async deleteMeeting(req, res) {
    try {
      await meetingService.deleteMeeting(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(err.statusCode || 400).json({ message: err.message });
    }
  }
}

module.exports = new MeetingController();
