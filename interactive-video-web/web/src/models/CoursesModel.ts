import VideosModel from "./VideosModel";

export default interface CoursesModel{
    id_cursos?: number,
    nome_curso: string,
    descricao_curso: string,
    imagem_curso: string,
    ativo: boolean,
    videos?: VideosModel[]
}