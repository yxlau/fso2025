import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (body) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, body, config)
  return response.data
}

const update = async (id, body) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, body, config)
  return response.data
}

const deleteOne = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(baseUrl + '/' + id, config)
  return response.data
}

export default { getAll, create, update, deleteOne, setToken }
