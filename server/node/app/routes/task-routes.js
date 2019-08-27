const express = require('express');
const TaskModel = require('../db/models/task-schema');

const router = express.Router();

router.get('', (req, res) => {
  TaskModel.find({}, (err, tasks) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    };
    res.status(200).send(tasks);
  });
})

router.post('', (req, res) => {
  const taskToSave = new TaskModel(req.body);

  taskToSave.save((err, createdTask) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    };
    res.status(201).send(createdTask);
  })
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  TaskModel.findByIdAndRemove(id, (err, task) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    };
    res.status(200).send();
  });
});

router.put('/:id/complete', (req, res) => {
  const id = req.params.id;

  TaskModel.findById(id, (err, task) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    };

    task.completed = true;
    task.save((err, completedTask) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      };
      res.status(200).send(completedTask);
    });
  });
});

module.exports = router;