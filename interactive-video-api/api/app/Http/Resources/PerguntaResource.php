<?php declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PerguntaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * @param Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id_perguntas'       => $this->id_perguntas,
            'descricao_pergunta' => $this->descricao_pergunta,
            'ativo'              => $this->ativo,
            'data_cadastro'      => $this->data_cadastro,
            'data_atualizacao'   => $this->data_atualizacao,
            'aparecer_em'        => $this->when($this->pivot , fn() => $this->pivot->aparecer_em)
        ];
    }
}
