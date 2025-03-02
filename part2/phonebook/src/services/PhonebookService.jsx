import axios from "axios";
const baseUrl = "/api/persons";

const create = (newPerson) => {
  return axios
    .post(baseUrl, newPerson)
    .then((response) => response.data)
};

const getAll = () => {
  return axios
    .get(baseUrl)
    .then((response) => response.data)
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

const update = (id, newPerson) => {
  console.log('update service', id, newPerson);
  
  return axios
    .put(`${baseUrl}/${id}`, newPerson)
    .then((response) => response.data);
};

export default {
  create,
  getAll,
  remove,
  update,
};
