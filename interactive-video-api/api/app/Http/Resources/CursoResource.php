<?php declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CursoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * @param Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id_cursos'        => $this->id_cursos,
            'nome_curso'       => $this->nome_curso,
            'descricao_curso'  => $this->descricao_curso,
            'imagem_curso'     => $this->imagem_curso,
            'ativo'            => $this->ativo,
            'data_cadastro'    => $this->data_cadastro,
            'data_atualizacao' => $this->data_atualizacao,
            'videos'           => $this->whenLoaded('videos', VideoResource::collection($this->videos))
        ];
    }
}
