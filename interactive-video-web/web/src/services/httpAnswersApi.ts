import api from "./api";
import AnswersModel from "../models/AnswersModel";

const PATH = 'respostas'

const httpAnswersApi = () => {

    return {
        all: async (idPergunta: number) => {
            return api.get(`perguntas/${idPergunta}/${PATH}`)
                .then((response): AnswersModel[] => {
                    return response.data.data
                })
                .catch(() => {
                    return [];
                })
        },
        findBy: async (idPergunta: number, idResposta: number): Promise<AnswersModel> => {
            return api.get(`perguntas/${idPergunta}/${PATH}/${idResposta}`)
                .then((response) => {
                    return response.data.data
                })
                .catch(() => {
                    return [];
                })
        },
        save: async (idPergunta: number, params: any) => {
            if (params.id) {
                return api.put(`perguntas/${idPergunta}/${PATH}/${params.id}`, params);
            }

            return api.post(`perguntas/${idPergunta}/${PATH}`, params);
        },
        destroy: async(idPergunta:number, idResposta:number) => {
            return api.delete(`perguntas/${idPergunta}/${PATH}/${idResposta}`);
        }
    }
}

export default httpAnswersApi;