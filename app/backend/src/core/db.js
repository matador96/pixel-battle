const path = require("path");
const fs = require("fs");

const dbName = "pixels";

const initializeDB = () => {
  try {
    const fileName = `../jsondb/${dbName}.json`;
    require(fileName);
  } catch (e) {
    const finalPath = path.join("../backend/src/jsondb", dbName + ".json");
    fs.appendFile(finalPath, "{}", function writeJSON(err) {
      if (err) return console.log(err);
    });
  }
};

const getDB = () => {
  const fileName = `../jsondb/${dbName}.json`;
  const file = require(fileName);
  return file;
};

const addRow = (key, value) => {
  const fileName = `../jsondb/${dbName}.json`;
  const file = require(fileName);

  file[key] = value;

  const finalPath = path.join("../backend/src/jsondb", dbName + ".json");

  fs.writeFile(finalPath, JSON.stringify({ ...file }), function writeJSON(err) {
    if (err) return console.log(err);
  });
};

module.exports = { getDB, initializeDB, addRow };
