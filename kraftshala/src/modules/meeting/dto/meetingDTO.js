
class CreateMeetingDTO {
  constructor(data) {
    this.userId = data?.userId;
    this.title = data?.title;
    this.startTime = data?.startTime;
    this.endTime = data?.endTime;
  }

  validate() {
    const errors = [];
    if (!this.userId) errors.push("userId is required");
    if (!this.title) errors.push("title is required");
    if (!this.startTime) errors.push("startTime is required");
    if (!this.endTime) errors.push("endTime is required");
    if (this.startTime && this.endTime) {
      if (new Date(this.startTime) >= new Date(this.endTime)) {
        errors.push("startTime must be before endTime");
      }
    }
    return errors.length > 0 ? errors : null;
  }
}

module.exports = { CreateMeetingDTO };
