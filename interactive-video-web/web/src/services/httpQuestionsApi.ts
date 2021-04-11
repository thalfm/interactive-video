import api from "./api";
import QuestionsModel from "../models/QuestionsModel";

const PATH = 'perguntas'

const httpQuestionsApi = () => {

    return {
        all: async () => {
            return api.get(PATH)
                .then((response): QuestionsModel[] => {
                    return response.data.data
                })
                .catch(() => {
                    return [];
                })
        },
        findBy: async (id: number): Promise<QuestionsModel> => {
            return api.get(`${PATH}/${id}`)
                .then((response) => {
                    return response.data.data
                })
                .catch(() => {
                    return [];
                })
        },
        save: async (params: any) => {
            if (params.id) {
                return api.post(`${PATH}/${params.id}?_method=PUT`, params);
            }

            return api.post(`${PATH}`, params);
        },
        destroy: async(id:number) => {
            return api.delete(`${PATH}/${id}?is_active=0`);
        }
    }
}

export default httpQuestionsApi;