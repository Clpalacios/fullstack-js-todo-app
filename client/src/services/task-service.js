import axiosClient from "../config/axios-client";

const basePath = '/tasks';

const getTasks = () => {
  return axiosClient.get(basePath);
}

const addTask = task => {
  return axiosClient.post(basePath, task);
}

const deleteTask = id => {
  return axiosClient.delete(`${basePath}/${id}`);
}

const completeTask = id => {
  return axiosClient.put(`${basePath}/${id}/complete`);
}

export { addTask, completeTask, deleteTask, getTasks };