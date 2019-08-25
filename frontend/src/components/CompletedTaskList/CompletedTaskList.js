import React from 'react';

import { Box, Typography } from '@material-ui/core';

import Task from '../Task/Task';

const CompletedTaskList = (props) => {
  const { onDeleteTask } = props;

  const tasks = props.completedTasks.map(task => {
    return (
      <Task
        key={task._id}
        task={task}
        onDeleteTask={onDeleteTask} />
    )
  });

  return (
    <Box>
      {
        tasks.length > 0 &&
        <Box>
          <Typography variant="h6" color="primary">
            Completed
          </Typography>
          {tasks}
        </Box>
      }
    </Box>
  );
}

export default CompletedTaskList;