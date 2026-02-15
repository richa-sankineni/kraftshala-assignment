const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;



sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite"   
});


// if (process.env.DB_URL) {
//   sequelize = new Sequelize(process.env.DB_URL, { logging: false });
// } else if (process.env.DB_NAME && process.env.DB_USER) {
//   sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD || null,
//     {
//       host: process.env.DB_HOST || "127.0.0.1",
//       dialect: process.env.DB_DIALECT || "postgres",
//       port: process.env.DB_PORT || 5432,
//       logging: false,
//     }
//   );
// } else {
  
//   try {
//     const config = require("./config/config.json");
//     const env = process.env.NODE_ENV || "development";
//     const conf = config[env] || {};
//     const username = conf.username || process.env.DB_USER || null;
//     const password = conf.password || process.env.DB_PASSWORD || null;
//     const database = conf.database || process.env.DB_NAME || null;
//     const host = conf.host || process.env.DB_HOST || "127.0.0.1";
//     const dialect = conf.dialect || process.env.DB_DIALECT || "postgres";

//     if (database && username !== null) {
//       sequelize = new Sequelize(database, username, password, {
//         host,
//         dialect,
//         port: conf.port || process.env.DB_PORT || 5432,
//         logging: false,
//       });
//     } else {
//       throw new Error("Database configuration not found in env or config file");
//     }
//   } catch (err) {
//     throw err;
//   }
// }

module.exports = { sequelize };
