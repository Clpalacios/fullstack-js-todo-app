const mongoose = require('mongoose');

const URI = process.env.APP_DB_MONGO_URI || "mongodb://localhost:27017/todoAppDB";

const connect = () => {
  return mongoose.connect(URI, { useNewUrlParser: true });
}

module.exports = { connect };