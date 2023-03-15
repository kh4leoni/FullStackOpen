import axios from "axios";
const baseUrl = '/api/persons'

const getData = async () => {
  const request = axios.get(baseUrl)
  const response = await request;
    return response.data;
};

const create = async (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    const response = await request;
    return response.data;
}

const update = async (id, editedPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, editedPerson)
    const response = await request;
    return response.data;
}

const deletePerson = async (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    const response = await request;
    return console.log('Delete succesful')
}



export default { getData, create, update, deletePerson }