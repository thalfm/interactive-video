export default interface AnswersModel{
    id_respostas?: number,
    id_perguntas: number,
    descricao_resposta: string,
    correta: boolean,
    ativo: boolean
}