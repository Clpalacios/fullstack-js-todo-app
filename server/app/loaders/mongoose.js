const mongoose = require('mongoose');

const DATABASE_URL = process.env.APP_DB_MONGO_URI || "mongodb://localhost:27017/todoAppDB";

const connect = async () => {
  const connection = await mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useFindAndModify: false });
  return connection.connection.db;
}

module.exports = connect;