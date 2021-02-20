<?php declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @SWG\Definition(
 *      definition="Curso",
 *      required={"nome_curso", "descricao_curso", "imagem_curso", "ativo", "data_cadastro"},
 *      @SWG\Property(
 *          property="id_cursos",
 *          description="Chave primaaria da tabela de Cursos",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="nome_curso",
 *          description="Nome do curso, deve ser unico.",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="descricao_curso",
 *          description="Descriçao do curso, aqui sera inserido os detalhes do curso",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="imagem_curso",
 *          description="Nome da imagem do curso que ira aparecer no catalogo",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="ativo",
 *          description="Status do curso 1 = ativo 0 = inativo",
 *          type="boolean"
 *      ),
 *      @SWG\Property(
 *          property="data_cadastro",
 *          description="Data de cadastro do curso",
 *          type="string",
 *          format="date-time"
 *      ),
 *      @SWG\Property(
 *          property="data_atualizacao",
 *          description="Data de atualizaçao do curso, esta coluna e sempre altera pela aplicaçao ao aterar os dados do curso",
 *          type="string",
 *          format="date-time"
 *      )
 * )
 */
class Curso extends Model
{
    use HasFactory;

    public $table = 'cursos';

    const CREATED_AT = 'data_cadastro';
    const UPDATED_AT = 'data_atualizacao';

    public $fillable = [
        'nome_curso',
        'descricao_curso',
        'imagem_curso',
        'ativo'
    ];

    protected $primaryKey = 'id_cursos';
    /**
     * The attributes that should be casted to native types.
     * @var array
     */
    protected $casts = [
        'id_cursos'        => 'integer',
        'nome_curso'       => 'string',
        'descricao_curso'  => 'string',
        'imagem_curso'     => 'string',
        'ativo'            => 'boolean',
        'data_cadastro'    => 'datetime',
        'data_atualizacao' => 'datetime'
    ];

    /**
     * Validation rules
     * @var array
     */
    public static $rules = [
        'nome_curso'       => 'required|string|max:100',
        'descricao_curso'  => 'required|string|max:2000',
        'imagem_curso'     => 'required|string|max:200',
        'ativo'            => 'required|boolean'
    ];

    /**
     * @return BelongsToMany
     **/
    public function usuarios()
    {
        return $this->belongsToMany(
            Usuario::class,
            'usuario_cursos'
        );
    }

    /**
     * @return BelongsToMany
     **/
    public function videos()
    {
        return $this->belongsToMany(
            Video::class,
            'curso_videos'
        );
    }
}
