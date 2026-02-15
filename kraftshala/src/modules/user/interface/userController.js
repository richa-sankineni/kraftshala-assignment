const userService = require("../service/userService");
const { CreateUserDTO } = require("../dto/userDTO");

class UserController {
  async createUser(req, res) {
    try {
      console.log('Creating user with data:', req.body);
      const dto = new CreateUserDTO(req.body);
      const errors = dto.validate();
      console.log('Validation errors:', errors);
      if (errors) {
        return res.status(400).json({ errors });
      }
      const user = await userService.createUser(req.body);
      console.log('User created:', user);
      res.status(201).json(user);
    } catch (err) {
      console.log('Error:', err.message);
      res.status(400).json({ message: err.message });
    }
  }

  async getUser(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async getAllUsers(req, res) { try { const users = await userService.getAllUsers(); res.json(users); } catch (err) { res.status(500).json({ message: err.message }); } }
}

module.exports = new UserController();
