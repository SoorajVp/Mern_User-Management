import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4000/',
    timeout: 5000,
    headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        // 'Content-Type': 'application/json'
    },
});

export default instance;