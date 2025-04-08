import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (body) => {
  console.log("the token", token);
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, body, config);
  return response.data;
};

export default { getAll, create, setToken };
