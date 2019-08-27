const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./app/db');
const taskRoutes = require('./app/routes/task-routes');

const PORT = process.env.APP_SERVER_NODE_PORT || 8080;

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/api/v1/tasks', taskRoutes);

db.connect().then(async () => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  });
});

