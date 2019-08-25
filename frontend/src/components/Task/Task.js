import React from 'react';

import { createStyles, makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Delete from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme =>
  createStyles({
    card: {
      marginLeft: theme.spacing(1),
    },
    icon: {
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
    },
    completedTask: {
      textDecoration: 'line-through'
    }
  })
);

const Task = (props) => {
  const { task, onCompleteTask, onDeleteTask } = props;
  const classes = useStyles();

  const handleCompleteTask = () => {
    onCompleteTask(task._id)
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
                color="primary"
                onChange={handleCompleteTask}
                value={task.completed}
                inputProps={{
                  'aria-label': 'primary checkbox',
                }}
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
              className={classes.icon}
              titleAccess='Delete'
              onClick={handleDeleteTask} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Task;