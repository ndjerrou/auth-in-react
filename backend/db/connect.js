const mongoose = require("mongoose");
const config = require("config");

const url = config.get("DB_URL");

module.exports = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to the Db");
  } catch (err) {
    console.error(err);
  }
};
