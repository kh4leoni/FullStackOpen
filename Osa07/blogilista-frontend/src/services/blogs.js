import axios from 'axios'
import blog from '../components/Blog'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  console.log(config)
  const request = await axios.post(baseUrl, newObject, config)
  return request.data
}

const update = async (id, blogToUpdate) => {
  console.log('And this is blogToUpdate from blog service', blogToUpdate)
  const request = await axios.put(`${baseUrl}/${id}`, blogToUpdate)
  console.log('This is requested data from blog service', request.data)
  return request.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

const addNewComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, {
    comment: comment,
  })
}

export default { getAll, create, update, remove, setToken, addNewComment }
