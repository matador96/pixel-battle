const express = require("express");
const compression = require("compression");
const routes = require("./routes");
const config = require("./config");
const bodyParser = require("body-parser");

const app = express();
require("dotenv").config();

require("./db");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(compression());
routes(app);

const server = app.listen(config.port, () =>
  console.log(`Listening on port ${config.port}`)
);
