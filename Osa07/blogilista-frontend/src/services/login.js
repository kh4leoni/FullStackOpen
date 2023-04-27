import axios from 'axios'

const baseUrl = '/api/login'

const login = async (credientals) => {
  const response = await axios.post(baseUrl, credientals)
  return response.data
}

export default { login }