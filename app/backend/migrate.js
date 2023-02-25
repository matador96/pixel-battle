const path = require("path");
const mysql = require("mysql");
const config = require("./config");

const con = mysql.createConnection({
  host: config.database.host,
  user: config.database.username,
  password: config.database.password,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  con.query(
    `CREATE DATABASE IF NOT EXISTS ${config.database.database}`,
    function (err, result) {
      if (err) throw err;
      console.log(`Database ${config.database.database} created/skipped`);
    }
  );

  con.query(`USE ${config.database.database}`, function (err, result) {
    if (err) throw err;
    console.log(`Choosed db ${config.database.database}`);
  });

  con.query(
    `CREATE TABLE IF NOT EXISTS users(
      id int(11) NOT NULL AUTO_INCREMENT,
      login varchar(50) NOT NULL,
      password text NOT NULL,
      created_at timestamp NOT NULL DEFAULT current_timestamp(),
      PRIMARY KEY (id),
      KEY id (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
    function (err, result) {
      if (err) throw err;
      console.log(`Created/Skipped table -> users`);
    }
  );

  con.query(
    `CREATE TABLE IF NOT EXISTS pixels (
      coordinate varchar(8) NOT NULL,
      color varchar(18) NOT NULL,
      userId int(100) NOT NULL,
      updated_at timestamp NOT NULL,
      PRIMARY KEY (coordinate)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
    function (err, result) {
      if (err) throw err;
      console.log(`Created/Skipped table -> pixels`);
    }
  );
});
