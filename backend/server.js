const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const config = require("./config");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compression());

const { initializeDB } = require("./src/core/db");
initializeDB();

const server = app.listen(config.port, () =>
  console.log(`Listening on port ${config.port}`)
);

require("./src/socket")(server);
