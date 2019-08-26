import React from 'react';

import { Box, Typography } from '@material-ui/core';

import Task from './Task';

const TaskList = props => {
  const { onCompleteTask, onDeleteTask } = props;

  const tasks = props.tasks.map(task => {
    return (
      <Task
        key={task._id}
        task={task}
        onCompleteTask={onCompleteTask}
        onDeleteTask={onDeleteTask} />
    );
  });

  return (
    <Box>
      {tasks.length > 0 &&
        <Box>
          <Typography variant="h6" color="secondary">
            In progress
          </Typography>
          {tasks}
        </Box>
      }
    </Box>
  );
}

export default TaskList;