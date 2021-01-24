<?php declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RespostaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * @param Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id_respostas'       => $this->id_respostas,
            'id_perguntas'       => $this->id_perguntas,
            'descricao_resposta' => $this->descricao_resposta,
            'correta'            => $this->correta,
            'ativo'              => $this->ativo,
            'data_cadastro'      => $this->data_cadastro,
            'data_atualizacao'   => $this->data_atualizacao
        ];
    }
}
