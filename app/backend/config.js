const mode = process.env.NODE_ENV || "development";
require("dotenv").config();

const config = {
  development: {
    port: "3040",
  },
  production: {
    port: process.env.SERVER_PORT,
  },
};

module.exports = config[mode];
