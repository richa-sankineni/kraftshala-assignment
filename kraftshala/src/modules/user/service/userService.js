const User = require("../model/user.model");

class UserService {
  async createUser(data) {
    return await User.create(data);
  }

  async getUserById(id) {
    return await User.findByPk(id);
  }

  async getAllUsers() {
    return await User.findAll();  // fetches all rows from Users table
  }
}

module.exports = new UserService();
