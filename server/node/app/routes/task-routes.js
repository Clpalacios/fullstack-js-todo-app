const express = require('express');
const taskService = require('../services/task-service');
const { handleErrorAsync } = require('../helpers/error');

const router = express.Router();

router.get('', handleErrorAsync(async (_req, res, _next) => {
  const tasks = await taskService.getAllTasks();
  res.status(200).send(tasks);
}));

router.post('', handleErrorAsync(async (req, res, _next) => {
  const createdTask = await taskService.createTask(req.body);
  if (createdTask) {
    res.status(201).send(createdTask);
  }
}));

router.delete('/:id', handleErrorAsync(async (req, res, _next) => {
  const deletedTask = await taskService.deleteTask(req.params.id);
  if (deletedTask) {
    res.status(200).send();
  }
}));

router.put('/:id', handleErrorAsync(async (req, res, _next) => {
  const updatedTask = await taskService.updateTask(req.params.id, req.body);
  if (updatedTask) {
    res.status(200).send(updatedTask);
  }
}));

module.exports = router;