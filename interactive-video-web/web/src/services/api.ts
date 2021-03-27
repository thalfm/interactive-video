import axios from 'axios';
import { TOKEN_KEY } from "./auth";

const api = axios.create({
    baseURL: "http://localhost:8000/api/v1"
});

api.interceptors.request.use(async config => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;