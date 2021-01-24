<?php

namespace App\Repositories;

use App\Models\Pergunta;
use App\Repositories\BaseRepository;

/**
 * Class PerguntaRepository
 * @package App\Repositories
 * @version January 24, 2021, 12:46 am UTC
*/

class PerguntaRepository extends BaseRepository
{
    /**
     * @var array
     */
    protected $fieldSearchable = [
        'descricao_pergunta',
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
        return Pergunta::class;
    }
}
