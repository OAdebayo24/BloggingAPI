require("dotenv").config();
const DB_CONNECTION = process.env.DB_CONNECTION;
const PORT = 5000
const SECRET = process.env.SECRET;

module.exports = {
  DB_CONNECTION,
  PORT,
  SECRET,
};
