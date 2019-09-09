import React from 'react';

import {
  createStyles,
  makeStyles,
  Card,
  CardContent,
  Checkbox,
  Grid,
  StepLabel,
  Tooltip,
  Typography,
  Zoom
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles(theme =>
  createStyles({
    card: {
      marginLeft: theme.spacing(1),
    },
    check: {
      color: theme.palette.primary.main,
    },
    completedTaskMark: {
      padding: theme.spacing(1)
    },
    deleteIcon: {
      color: theme.palette.secondary.light,
      paddingTop: theme.spacing(1),
      '&:hover': {
        color: theme.palette.secondary.main
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
          <Grid item xs={2} sm={1}>
            {
              !task.completed &&
              <Tooltip
                aria-label="complete"
                enterDelay={500}
                title="Complete"
                TransitionComponent={Zoom}>
                <Checkbox
                  checked={task.completed}
                  className={classes.check}
                  color="primary"
                  inputProps={{ 'aria-label': 'complete', }}
                  onChange={handleCompleteTask}
                />
              </Tooltip>
            }
            {
              task.completed &&
              <StepLabel className={classes.completedTaskMark} icon={
                <img src={require("../../assets/logo-inverted.svg")} alt="" width="24" height="24" />}
              />
            }
          </Grid>
          <Grid item xs={9} sm={10}>
            <Typography
              variant="body2"
              className={classes.taskDescription}>
              {task.description}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Tooltip
              aria-label="delete"
              enterDelay={500}
              title="Delete"
              TransitionComponent={Zoom}>
              <Delete
                className={classes.deleteIcon}
                onClick={handleDeleteTask} />
            </Tooltip>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Task;