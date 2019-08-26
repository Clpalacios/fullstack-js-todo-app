const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./db');
const taskRoutes = require('./routes/task-routes');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/api/v1/tasks', taskRoutes);

db.connect().then(async () => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});

