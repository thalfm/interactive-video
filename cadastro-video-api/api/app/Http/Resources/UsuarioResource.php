<?php declare(strict_types=1);

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UsuarioResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * @param Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id_usuarios'      => $this->id_usuarios,
            'nome_usuario'     => $this->nome_usuario,
            'email'            => $this->email,
            'senha'            => $this->senha,
            'ativo'            => $this->ativo,
            'data_cadastro'    => $this->data_cadastro,
            'data_atualizacao' => $this->data_atualizacao
        ];
    }
}
