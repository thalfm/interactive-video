import api from "./api";
import CoursesModel from "../models/CoursesModel";

const PATH = 'cursos'

const httpCoursesApi = () => {

    return {
        all: async () => {
            return api.get(PATH)
                .then((response): CoursesModel[] => {
                    return response.data.data
                })
                .catch(() => {
                    return [];
                })
        },
        findBy: async (id: number): Promise<CoursesModel> => {
            return api.get(`${PATH}/${id}`)
                .then((response) => {
                    return response.data.data
                })
                .catch(() => {
                    return [];
                })
        },
        save: async (params: any) => {
            let formData = new FormData()
            Object.keys(params).forEach((key) => {
                if (key !== undefined && key === 'image') {
                    formData.append('imagem_curso', params.image ? params.image[0].file  : '')
                }

                formData.append(key, params[key])
            })

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            if (params.id != undefined && params.id > 0) {
                return api.post(`${PATH}/${params.id}?_method=PUT`, formData, config);
            }

            return api.post(`${PATH}`, formData, config);
        },
        destroy: async(id:number) => {
            return api.delete(`${PATH}/${id}?is_active=0`);
        }
    }
}

export default httpCoursesApi;