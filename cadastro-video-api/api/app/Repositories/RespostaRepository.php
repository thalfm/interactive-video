<?php

namespace App\Repositories;

use App\Models\Resposta;
use App\Repositories\BaseRepository;

/**
 * Class RespostaRepository
 * @package App\Repositories
 * @version January 24, 2021, 12:46 am UTC
*/

class RespostaRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'id_perguntas',
        'descricao_resposta',
        'correta',
        'ativo',
        'data_cadastro',
        'data_atualizacao'
    ];

    /**
     * Return searchable fields
     *
     * @return array
     */
    public function getFieldsSearchable()
    {
        return $this->fieldSearchable;
    }

    /**
     * Configure the Model
     **/
    public function model()
    {
        return Resposta::class;
    }
}
