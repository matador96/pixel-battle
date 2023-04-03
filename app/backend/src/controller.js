const DB = require("./core/db");
const helpers = require("./helpers");

module.exports.getPixels = () => {
  const pixels = DB.getDB();

  return pixels;
};

module.exports.updatePixel = (x, y, color) => {
  const key = helpers.coordinateToKey(x, y);

  DB.addRow(key, color);

  return { [key]: color };
};
