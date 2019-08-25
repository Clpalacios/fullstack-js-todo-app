import React, { useState } from 'react';

import {
  createStyles,
  makeStyles,
  Button,
  Grid,
  TextField
} from '@material-ui/core';

import { addTask } from '../../services/task-service';

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

const NewTask = props => {
  const classes = useStyles();
  const [taskDescription, setTaskDescription] = useState('');

  const handleNewTodoEntry = () => {
    addTask({ description: taskDescription }).then(response => {
      setTaskDescription('');
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
          value={taskDescription}
          onChange={ev => setTaskDescription(ev.target.value)}
        />
      </Grid>
      <Grid item xs={3} sm={2}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={taskDescription === ''}
          onClick={handleNewTodoEntry}>
          Add
        </Button>
      </Grid>
    </Grid>
  )
};

export default NewTask;