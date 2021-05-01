import api from "./api";
import VideosModel from "../models/VideosModel";
import {AxiosRequestConfig, AxiosResponse} from "axios";

const PATH = 'videos'

const httpVideosApi = () => {

    return {
        all: async () => {
            return api.get<AxiosResponse<VideosModel[]>>(PATH)
                .then((response): VideosModel[] => {
                    return response.data.data
                })
                .catch(() => {
                    return [];
                })
        },
        findBy: async (id: number): Promise<VideosModel> => {
            return api.get(`${PATH}/${id}`)
                .then((response) => {
                    return response.data.data
                })
                .catch(() => {
                    return [];
                })
        },
        save: async (params: any, options?: { http?: { usePost: boolean }, config?: AxiosRequestConfig }): Promise<{ data: { data: VideosModel } }> => {
            if (params.id) {
                return api.put(`${PATH}/${params.id}`, params, options?.config as AxiosRequestConfig);
            }

            return api.post(`${PATH}`, params, options?.config as AxiosRequestConfig);
        },
        upload: async (
            {id_videos, nome_video, socket_id}: { id_videos: number, nome_video: File, socket_id: string },
            options?: { http?: { usePost: boolean }, config?: AxiosRequestConfig }
        ) => {
            let formData = new FormData()
            formData.append('id_video', id_videos as unknown as string)
            formData.append('nome_video', nome_video)
            formData.append('socket_id', socket_id)

            const params = new URLSearchParams({
                socket_id: socket_id,
                id_video: id_videos as unknown as string
            }).toString();

            const url =
                "http://localhost:3003/upload?" +
                params;

            return api.post(url, formData, options?.config as AxiosRequestConfig);
        },
        destroy: async (id: number) => {
            return api.delete(`${PATH}/${id}?is_active=0`);
        },
        relateQuestion: async (id: number, data: {id_perguntas: number, aparecer_em: string}) => {
            return api.post(`${PATH}/${id}/perguntas`, data);
        },
        getRelatedQuestions: async (id: number): Promise<AxiosResponse<{data: VideosModel}>> => {
            return await api.get(`${PATH}/${id}/perguntas`);
        },
    }
}

export default httpVideosApi;