<?php declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

/**
 * @SWG\Definition(
 *      definition="Video",
 *      required={"titulo_video", "nome_video", "ativo", "data_cadastro"},
 *      @SWG\Property(
 *          property="id_videos",
 *          description="Chave primaria da tabela de videos",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="titulo_video",
 *          description="Titulo do video",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="nome_video",
 *          description="Nome do video, deve ser unico, gerado pela aplicacao como md5 do timestamp",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="ativo",
 *          description="Status do video 1 = ativo 0 = inativo",
 *          type="boolean"
 *      ),
 *      @SWG\Property(
 *          property="data_cadastro",
 *          description="data_cadastro",
 *          type="string",
 *          format="date-time"
 *      ),
 *      @SWG\Property(
 *          property="data_atualizacao",
 *          description="data_atualizacao",
 *          type="string",
 *          format="date-time"
 *      )
 * )
 */
class Video extends Model
{
    use HasFactory;

    const PUBLIC_PATH = 'public' . DIRECTORY_SEPARATOR;
    const STORAGE_PUBLIC = 'storage' . DIRECTORY_SEPARATOR;

    public $table = 'videos';

    const CREATED_AT = 'data_cadastro';
    const UPDATED_AT = 'data_atualizacao';

    public $fillable = [
        'titulo_video',
        'nome_video',
        'ativo',
        'ativo'
    ];

    protected $primaryKey = 'id_videos';

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'id_videos' => 'integer',
        'titulo_video' => 'string',
        'nome_video' => 'string',
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
        'titulo_video' => 'required|string|max:100',
        'ativo' => 'required|boolean',
    ];

    /**
     * @return BelongsToMany
     **/
    public function cursos()
    {
        return $this->belongsToMany(Curso::class, 'curso_videos');
    }

    /**
     * @return BelongsToMany
     **/
    public function perguntas()
    {
        return $this->belongsToMany(
            Pergunta::class,
            'videos_perguntas',
            'id_videos',
            'id_perguntas'
        )->withPivot('aparecer_em');
    }
}
