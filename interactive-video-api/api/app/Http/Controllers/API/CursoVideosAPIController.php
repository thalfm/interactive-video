<?php declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateCursoVideosRequest;
use App\Http\Resources\CursoResource;
use App\Models\Curso;
use App\Repositories\CursoRepository;

class CursoVideosAPIController extends AppBaseController
{
    private CursoRepository $cursoRepository;

    public function __construct(CursoRepository $cursoRepository)
    {
        $this->cursoRepository = $cursoRepository;
    }

    public function index(int $curso)
    {
        $videos = $this->cursoRepository->find($curso)->videos()->get();

        if (!$videos->count()) {
            return $this->sendError('Nenhum relacionamento encontrado', 200);
        }

        $curso = $this->cursoRepository->find($curso);

        return new CursoResource($curso);
    }

    public function store(int $curso, CreateCursoVideosRequest $request)
    {
        /** @var Curso $cursos */
        $cursos = $this->cursoRepository->find($curso);
        $cursos->videos()->attach($request->only('id_videos'));

        return $this->sendResponse($cursos->toArray(), 'Cursos retrieved successfully');
    }

    public function destroy(int $curso, int $video, CreateCursoVideosRequest $request)
    {
        /** @var Curso $cursos */
        $cursos = $this->cursoRepository->find($curso);
        $cursos->videos()->detach($video);

        return $this->sendResponse($cursos->toArray(), 'Cursos retrieved successfully');
    }
}
