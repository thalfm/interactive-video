<?php declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @SWG\Definition(
 *      definition="Pergunta",
 *      required={"descricao_pergunta", "ativo", "data_cadastro"},
 *      @SWG\Property(
 *          property="id_perguntas",
 *          description="id_perguntas",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="descricao_pergunta",
 *          description="Descriçao da pergunta que aparece no video",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="ativo",
 *          description="Status da pergunta 1 = ativo 0 = inativo",
 *          type="boolean"
 *      ),
 *      @SWG\Property(
 *          property="data_cadastro",
 *          description="Data de cadastro da pergunta",
 *          type="string",
 *          format="date-time"
 *      ),
 *      @SWG\Property(
 *          property="data_atualizacao",
 *          description="Data de atualizacao da pergunta, atualizada pelo sistema sempre que a pergunta tiver alteraçao",
 *          type="string",
 *          format="date-time"
 *      )
 * )
 */
class Pergunta extends Model
{
    use HasFactory;

    public $table = 'perguntas';

    const CREATED_AT = 'data_cadastro';
    const UPDATED_AT = 'data_atualizacao';

    public $fillable = [
        'descricao_pergunta',
        'ativo'
    ];

    protected $primaryKey = 'id_perguntas';

    /**
     * The attributes that should be casted to native types.
     * @var array
     */
    protected $casts = [
        'id_perguntas'       => 'integer',
        'descricao_pergunta' => 'string',
        'ativo'              => 'boolean',
        'data_cadastro'      => 'datetime',
        'data_atualizacao'   => 'datetime'
    ];

    /**
     * Validation rules
     * @var array
     */
    public static $rules = [
        'descricao_pergunta' => 'required|string|max:400',
        'ativo'              => 'required|boolean',
    ];

    /**
     * @return HasMany
     **/
    public function respostas()
    {
        return $this->hasMany(Resposta::class, 'id_perguntas');
    }

    /**
     * @return BelongsToMany
     **/
    public function videos()
    {
        return $this->belongsToMany(Video::class, 'videos_perguntas');
    }
}
