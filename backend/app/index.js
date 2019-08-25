const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./models/index');
const TaskModel = require('./models/task');

const port = 8000;
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.get('/api/v1/tasks', (req, res) => {
  TaskModel.find({}, (err, tasks) => {
    if (err) return console.error(err);
    res.status(200).send(tasks);
  })
});

app.post('/api/v1/tasks', (req, res) => {
  const taskToSave = new TaskModel(req.body);

  taskToSave.save((err, createdTask) => {
    if (err) return console.error(err);
    res.status(201).send(createdTask);
  })
});

app.delete('/api/v1/tasks/:id', (req, res) => {
  const id = req.params.id;

  TaskModel.findByIdAndRemove(id, (err, task) => {
    if (err) return console.error(err);
    res.status(200).send();
  });
});

app.put('/api/v1/tasks/:id/complete', (req, res) => {
  const id = req.params.id;

  TaskModel.findById(id, (err, task) => {
    if (err) return console.error(err);
    task.completed = true;
    task.save((err, completedTask) => {
      if (err) return console.error(err);
      res.status(200).send(completedTask);
    });
  });
});

db.connect().then(async () => {
  app.listen(port, () => console.log(`App listening on port ${port}`));
});

