const mongoose = require('mongoose')
require('dotenv').config()

const CONNECTION_URI = process.env.MONGODB_CONNECTION_URI;

module.exports = () => {
  mongoose
    .connect(CONNECTION_URI)
    .then(() => {
      console.log("Connection to MongoDB successfull");
    })
    .catch((err) => {
      console.log("Connection to MongoDB failed", err.message);
    });
};
