<?php declare(strict_types=1);

namespace App\Models;

use Chelout\RelationshipEvents\Concerns\HasBelongsToManyEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

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
    use HasFactory, HasBelongsToManyEvents;

    const PUBLIC_PATH = 'public' . DIRECTORY_SEPARATOR;
    const STORAGE_PUBLIC = 'storage' . DIRECTORY_SEPARATOR;

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
        'imagem_curso'     => 'required|max:1000',
        'ativo'            => 'required|boolean'
    ];

    protected $observables = ['belongsToManyAttached', 'belongsToManyDetached'];

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
            'curso_videos',
            'id_cursos',
            'id_videos'
        );
    }

    public function setImagemCursoAttribute($value)
    {
        if ($value instanceof UploadedFile) {
            $nomeImagemCurso = md5(date('YmdHis')) . '.' . $value->extension();

            $path = self::PUBLIC_PATH . $nomeImagemCurso;

            Storage::disk('s3')->put($path, $value->getContent(), 'public');
            $this->attributes['imagem_curso'] = $nomeImagemCurso;
            return;
        }

        $this->attributes['imagem_curso'] = $value;
    }

    public function getImagemCursoAttribute($value)
    {
        $path = self::PUBLIC_PATH . $value;
        return Storage::disk('s3')->url($path);
    }
}
