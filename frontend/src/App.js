import React, { useState, useEffect } from 'react';

import Container from '@material-ui/core/Container';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import NavBar from './components/NavBar/NavBar';
import TaskList from './components/TaskList/TaskList';
import CompletedTaskList from './components/CompletedTaskList/CompletedTaskList';
import NewTask from './components/NewTask/NewTask';
import { completeTask, deleteTask, retrieveTasks } from './services/task-service';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1,
    }
  }),
);

const App = () => {
  const classes = useStyles();
  const [tasks, setTasks] = useState([])
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    retrieveTasks().then(response => {
      const tasks = response.data;
      const todo = tasks.filter(t => !t.completed);
      const completed = tasks.filter(t => t.completed);

      setTasks(todo);
      setCompletedTasks(completed);
    });
  }, []);

  const handleNewTaskCreated = createdTask => {
    setTasks([createdTask, ...tasks]);
  }

  const handleCompleteTask = id => {
    completeTask(id).then(response => {
      const completedTask = response.data;
      const index = tasks.findIndex(t => t._id === completedTask._id);

      tasks.splice(index, 1);

      setTasks([...tasks]);
      setCompletedTasks([completedTask, ...completedTasks]);
    });
  }

  const handleDeleteTask = id => {
    deleteTask(id).then(_ => {
      let index = tasks.findIndex(t => t._id === id);

      if (index > -1) {
        tasks.splice(index, 1);
        setTasks([...tasks]);
      } else {
        index = completedTasks.findIndex(t => t._id === id);
        completedTasks.splice(index, 1);
        setCompletedTasks([...completedTasks]);
      }
    });
  }

  return (
    <div className={classes.root}>
      <NavBar />
      <Container maxWidth="sm">
        <NewTask onNewTaskCreated={handleNewTaskCreated} />
        <TaskList
          tasks={tasks}
          onCompleteTask={handleCompleteTask}
          onDeleteTask={handleDeleteTask} />
        <CompletedTaskList
          completedTasks={completedTasks}
          onDeleteTask={handleDeleteTask} />
      </Container>
    </div>
  );
}

export default App;