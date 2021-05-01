import QuestionsModel from "./QuestionsModel";

export default interface VideosModel{
    id_videos?: number,
    titulo_video: string,
    nome_video: string,
    ativo: boolean,
    perguntas?: QuestionsModel[]
}