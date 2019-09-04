const express = require('express');
const TaskModel = require('../db/models/task-schema');
const { ErrorHandler } = require('../helpers/error');

const router = express.Router();

router.get('', async (_req, res, next) => {
  try {
    const tasks = await TaskModel.find();
    res.status(200).send(tasks);
  } catch (error) {
    next(error);
  }
})

router.post('', async (req, res, next) => {
  const taskToSave = new TaskModel(req.body);

  try {
    const createdTask = await taskToSave.save();
    res.status(201).send(createdTask);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  const _id = req.params.id;

  try {
    const deletedTask = await TaskModel.findOneAndDelete({ _id });

    if (!deletedTask) {
      throw new ErrorHandler(404, `Task not found for id ${_id}`)
    }

    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  const _id = req.params.id;

  try {
    const updatedTask = await TaskModel.findOneAndUpdate({ _id }, req.body, { new: true });

    if (!updatedTask) {
      throw new ErrorHandler(404, `Task not found for id ${_id}`);
    }

    res.status(200).send(updatedTask);
  } catch (error) {
    next(error);
  }
});

module.exports = router;