import React from 'react';

import {
  createStyles,
  makeStyles,
  Card,
  CardContent,
  Checkbox,
  Grid,
  Typography,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles(theme =>
  createStyles({
    card: {
      marginLeft: theme.spacing(1),
    },
    check: {
      color: theme.palette.primary.main
    },
    completedTask: {
      textDecoration: 'line-through'
    },
    deleteIcon: {
      color: theme.palette.secondary.main,
      paddingTop: theme.spacing(1),
      '&:hover': {
        color: theme.palette.secondary.light
      }
    },
    taskDescription: {
      flexGrow: 1,
      paddingTop: theme.spacing(1) + theme.spacing(1) / 2,
      overflowWrap: 'break-word',
    }
  })
);

const Task = props => {
  const { task, onCompleteTask, onDeleteTask } = props;
  const classes = useStyles();

  const handleCompleteTask = () => {
    task.completed = true;
    onCompleteTask(task);
  }

  const handleDeleteTask = () => {
    onDeleteTask(task._id);
  }

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Grid container>
          {!task.completed &&
            <Grid item xs={2} sm={1}>
              <Checkbox
                checked={false}
                className={classes.check}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox', }}
                value={task.completed}
                onChange={handleCompleteTask}
              />
            </Grid>
          }
          <Grid item xs={task.completed ? 11 : 9} sm={task.completed ? 11 : 10}>
            <Typography
              variant="body2"
              className={`${classes.taskDescription} ${task.completed ? classes.completedTask : ''}`}>
              {task.description}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Delete
              className={classes.deleteIcon}
              onClick={handleDeleteTask} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Task;