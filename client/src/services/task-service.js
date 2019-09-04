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

const updateTask = task => {
  return axiosClient.put(`${basePath}/${task._id}`, task);
}

export { addTask, updateTask, deleteTask, getTasks };