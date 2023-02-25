const mode = process.env.NODE_ENV || "development";
require("dotenv").config();

const config = {
  development: {
    database: {
      username: "root",
      password: "",
      database: "pixelbattle",
      host: "localhost",
      db_port: "3306",
    },
    port: "3040",
  },
  production: {
    database: {
      host: process.env.MYSQL_HOST_IP,
      db_port: process.env.MYSQL_PORT,
      database: process.env.MYSQL_DATABASE,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD || "",
    },
    port: process.env.SERVER_PORT,
  },
};

module.exports = config[mode];
