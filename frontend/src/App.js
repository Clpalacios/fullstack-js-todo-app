import React, { useEffect, useState } from 'react';

import { createStyles, makeStyles, Container } from '@material-ui/core';

import { NavBar, Notification } from './components/layout';
import { CompletedTaskList, NewTask, TaskList } from './components/task';
import { completeTask, deleteTask, getTasks } from './services/task-service';

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
  const [notificationMustBeDisplayed, setNotificationMustBeDisplayed] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('info');

  useEffect(() => {
    getTasks().then(response => {
      const tasks = response.data;
      const toComplete = tasks.filter(t => !t.completed);
      const completed = tasks.filter(t => t.completed);

      setTasks(toComplete);
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

      displayNotification('Task completed!', 'success')
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

      displayNotification('Task eliminated successfully.', 'info');
    });
  }

  const handleCloseNotification = () => {
    setNotificationMustBeDisplayed(false);
  }

  const displayNotification = (message, type) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setNotificationMustBeDisplayed(true);
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
        <Notification
          message={notificationMessage}
          open={notificationMustBeDisplayed}
          type={notificationType}
          onClick={handleCloseNotification} />
      </Container>
    </div>
  );
}

export default App;