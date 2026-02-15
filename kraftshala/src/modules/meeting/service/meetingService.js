const { Op } = require("sequelize");
const Meeting = require("../model/meeting.model");


class MeetingService {
  async hasConflict({ userId, startTime, endTime, excludeId }) {
    return await Meeting.findOne({
      where: {
        userId,
        ...(excludeId ? { id: { [Op.ne]: excludeId } } : {}),
        startTime: { [Op.lt]: endTime },
        endTime: { [Op.gt]: startTime },
      },
    });
  }

  async createMeeting(data) {
    const { userId, startTime, endTime } = data;

    if (new Date(startTime) >= new Date(endTime)) {
      throw new Error("startTime must be before endTime");
    }

    const conflict = await this.hasConflict({ userId, startTime, endTime });
    if (conflict) {
      const err = new Error("Time slot already booked");
      err.statusCode = 400;
      throw err;
    }

    return await Meeting.create(data);
  }

  async getAllMeetings(filters = {}) {
    const where = {};
    if (filters.userId) where.userId = filters.userId;

    if (filters.startDate || filters.endDate) {
      if (filters.endDate) where.startTime = { [Op.lt]: filters.endDate };
      if (filters.startDate) where.endTime = { [Op.gt]: filters.startDate };
    }

    return await Meeting.findAll({ where, order: [['startTime', 'ASC']] });
  }

  async updateMeeting(id, data) {
    const { userId, startTime, endTime } = data;

    if (startTime && endTime && new Date(startTime) >= new Date(endTime)) {
      throw new Error("startTime must be before endTime");
    }

    const meeting = await Meeting.findByPk(id);
    if (!meeting) throw new Error("Meeting not found");

    if (startTime && endTime) {
      const conflict = await this.hasConflict({ userId: userId || meeting.userId, startTime, endTime, excludeId: id });
      if (conflict) {
        const err = new Error("Time slot already booked");
        err.statusCode = 400;
        throw err;
      }
    }

    return await meeting.update(data);
  }

  async getMeetingById(id) {
    return await Meeting.findByPk(id);
  }

  async deleteMeeting(id) {
    const meeting = await Meeting.findByPk(id);
    if (!meeting) throw new Error("Meeting not found");
    return await meeting.destroy();
  }
}

module.exports = new MeetingService();
