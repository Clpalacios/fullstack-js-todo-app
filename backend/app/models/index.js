const mongoose = require('mongoose');
const TaskModel = require('./task').default;

const models = { TaskModel };

const connect = () => {
  return mongoose.connect('mongodb://localhost:27017/fullstack-js-todo-app');
}

module.exports = {
  connect,
  models
};