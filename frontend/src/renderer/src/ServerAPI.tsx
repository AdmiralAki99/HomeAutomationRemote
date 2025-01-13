import axios from "axios";

const serverAPI = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    timeout: 0
})

export default serverAPI;