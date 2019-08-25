import React, { useState } from 'react';

import { createStyles, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { addNewTask } from '../../services/task-service';

const useStyles = makeStyles(theme =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    root: {
      flexGrow: 1,
    }
  })
);

const NewTask = (props) => {
  const classes = useStyles();
  const [task, setTask] = useState('');

  const handleNewTodoEntry = () => {
    const newTask = { description: task, completed: false }
    addNewTask(newTask).then(response => {
      setTask('');
      props.onNewTaskCreated(response.data);
    });
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={9} sm={10}>
        <TextField
          id="standard-full-width"
          style={{ margin: 8 }}
          placeholder="Enter task description"
          fullWidth
          margin="normal"
          multiline
          InputLabelProps={{
            shrink: true,
          }}
          value={task}
          onChange={ev => setTask(ev.target.value)}
        />
      </Grid>
      <Grid item xs={3} sm={2}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={task === ''}
          onClick={handleNewTodoEntry}>
          Add
        </Button>
      </Grid>
    </Grid>
  )
};

export default NewTask;