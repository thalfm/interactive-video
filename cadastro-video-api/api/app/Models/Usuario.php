<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @SWG\Definition(
 *      definition="Usuario",
 *      required={"nome_usuario", "email", "senha", "ativo", "data_cadastro"},
 *      @SWG\Property(
 *          property="id_usuarios",
 *          description="chave prmaria da tabela Usuarios",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="nome_usuario",
 *          description="Nome completo do usuario",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="email",
 *          description="E-mail do usuario, tanbem utilizado para login ",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="senha",
 *          description="senha do usuario criptografaga em bcrypt",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="ativo",
 *          description="Status do usuario 1 = ativo 0 = inativo",
 *          type="boolean"
 *      ),
 *      @SWG\Property(
 *          property="data_cadastro",
 *          description="Data de cadastro do usuario",
 *          type="string",
 *          format="date-time"
 *      ),
 *      @SWG\Property(
 *          property="data_atualizacao",
 *          description="Data de atualizaçao do usuario, esta coluna e sempre altera pela aplicaçao ao aterar os dados do usuario",
 *          type="string",
 *          format="date-time"
 *      )
 * )
 */
class Usuario extends Model
{
    use HasFactory;

    public $table = 'usuarios';

    const CREATED_AT = 'data_cadastro';
    const UPDATED_AT = 'data_atualizacao';

    public $fillable = [
        'nome_usuario',
        'email',
        'senha',
        'ativo'
    ];

    protected $primaryKey = 'id_usuarios';

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id_usuarios' => 'integer',
        'nome_usuario' => 'string',
        'email' => 'string',
        'senha' => 'string',
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
        'nome_usuario' => 'required|string|max:200',
        'email' => 'required|string|max:300',
        'senha' => 'required|string|max:45',
        'ativo' => 'required|boolean',
    ];

    /**
     * @return BelongsToMany
     **/
    public function cursos()
    {
        return $this->belongsToMany(Curso::class, 'usuario_cursos');
    }
}
