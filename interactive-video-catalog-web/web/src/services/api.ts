import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:3004"
});

export const findCourses = async (search: string = "") => {
    const paramsReq = {
        "offset": 0,
        "limit": 100,
        "skip": 0,
        "where": {
            "additionalProp1": {
                "nome_curso": search
            }
        }
    }

    const response = await api.get('/courses', {
        params: {
            filter: paramsReq
        }
    });

    return response.data;
}

export default api;