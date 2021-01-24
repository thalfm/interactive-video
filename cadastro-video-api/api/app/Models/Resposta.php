<?php declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @SWG\Definition(
 *      definition="Resposta",
 *      required={"id_perguntas", "descricao_resposta", "correta", "data_cadastro"},
 *      @SWG\Property(
 *          property="id_respostas",
 *          description="Chave primaria da tabela de respostas",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="id_perguntas",
 *          description="Chave estrangeira para tabela de perguntas, uma pergunta tem varias respostas",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="descricao_resposta",
 *          description="Descrição da resposta",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="correta",
 *          description="Resposta correta = 1 errada = 0",
 *          type="boolean"
 *      ),
 *      @SWG\Property(
 *          property="ativo",
 *          description="Status da reposta 1 = ativo 0 = inativo ",
 *          type="boolean"
 *      ),
 *      @SWG\Property(
 *          property="data_cadastro",
 *          description="Data de cadastro da resposta",
 *          type="string",
 *          format="date-time"
 *      ),
 *      @SWG\Property(
 *          property="data_atualizacao",
 *          description="Data de atualizaçao da resposta, atualizado pela aplicaçao sempre que a resposta for alterada",
 *          type="string",
 *          format="date-time"
 *      )
 * )
 */
class Resposta extends Model
{
    use HasFactory;

    public $table = 'respostas';

    const CREATED_AT = 'data_cadastro';
    const UPDATED_AT = 'data_atualizacao';

    public $fillable = [
        'id_perguntas',
        'descricao_resposta',
        'correta',
        'ativo'
    ];

    protected $primaryKey = 'id_respostas';

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id_respostas' => 'integer',
        'id_perguntas' => 'integer',
        'descricao_resposta' => 'string',
        'correta' => 'boolean',
        'ativo' => 'boolean',
        'data_cadastro' => 'datetime',
        'data_atualizacao' => 'datetime'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'id_perguntas' => 'required|integer',
        'descricao_resposta' => 'required|string|max:50',
        'correta' => 'required|boolean',
        'ativo' => 'nullable|boolean',
    ];

    /**
     * @return BelongsTo
     **/
    public function idPerguntas()
    {
        return $this->belongsTo(Pergunta::class, 'id_perguntas');
    }
}
