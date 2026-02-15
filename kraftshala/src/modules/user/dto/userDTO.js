
class CreateUserDTO {
  constructor(data) {
    this.name = data?.name;
    this.email = data?.email;
  }

  validate() {
    const errors = [];
    if (!this.name) errors.push("name is required");
    if (!this.email) errors.push("email is required");
    if (this.email && !this.isValidEmail(this.email)) errors.push("email format is invalid");
    return errors.length > 0 ? errors : null;
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

module.exports = { CreateUserDTO };
