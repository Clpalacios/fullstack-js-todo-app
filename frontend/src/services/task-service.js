import axiosClient from "../config/http-client";

const retrieveTasks = () => {
  return axiosClient.get('/tasks');
}

const addNewTask = task => {
  return axiosClient.post('/tasks', task);
}

const deleteTask = id => {
  return axiosClient.delete(`/tasks/${id}`);
}

const completeTask = id => {
  return axiosClient.put(`/tasks/${id}/complete`);
}

export { addNewTask, completeTask, deleteTask, retrieveTasks };