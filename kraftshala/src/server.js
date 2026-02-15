require("dotenv").config();
const { sequelize } = require("./config/database");
const app = require("./app");

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    
    await sequelize.sync();
    console.log("Database connected and synced.");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
})();
