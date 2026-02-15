const express = require("express");
const userRoutes = require("./modules/user/routes");
const meetingRoutes = require("./modules/meeting/routes");
const { sequelize } = require("./config/database");
const User = require("./modules/user/model/user.model");
const Meeting = require("./modules/meeting/model/meeting.model");




const app = express();
app.use(express.json());


app.get("/", (req, res) => {
  res.send("API is running...");
});


app.use("/api", meetingRoutes);
User.hasMany(Meeting, { foreignKey: "userId" });
Meeting.belongsTo(User, { foreignKey: "userId" });


sequelize.sync({ alter: true })  
  .then(() => console.log("✅ Database synced, tables created"))
  .catch(err => console.error("❌ Error syncing DB:", err));


app.use("/users", userRoutes);
app.use("/meetings", meetingRoutes);
app.listen(5432);
module.exports = app;





