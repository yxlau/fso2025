import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const create = (newPerson) => {
  return axios
    .post(baseUrl, newPerson)
    .then((response) => response.data)
    .catch(error => {
      console.log(error);
      
    })
};

const getAll = () => {
  return axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch(error => {
      console.log(error);
      
    })
};

const remove = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => response.data)
    .catch(error => {
      console.log(error);
      
    })
};

const update = (id, newPerson) => {
  return axios
  .put(`${baseUrl}/${id}`, newPerson)
  .then(response => response.data)
  .catch(error => {
    console.log(error)
  }
  )
}

export default {
  create,
  getAll,
  remove,
  update
};
