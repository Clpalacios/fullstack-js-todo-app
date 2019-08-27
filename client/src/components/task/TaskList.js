import React from 'react';

import { createStyles, makeStyles, Box, Typography } from '@material-ui/core';

import Task from './Task';

const useStyles = makeStyles(theme =>
  createStyles({
    title: {
      color: '#616db0',
    }
  })
);

const TaskList = props => {
  const { onCompleteTask, onDeleteTask } = props;
  const classes = useStyles();

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
          <Typography variant="h6" className={classes.title}>
            In progress
          </Typography>
          {tasks}
        </Box>
      }
    </Box>
  );
}

export default TaskList;