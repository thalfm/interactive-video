<?php declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreateVideosPerguntasRequest;
use App\Http\Resources\VideoResource;
use App\Models\Video;
use App\Repositories\VideoRepository;

class VideoPerguntasAPIController extends AppBaseController
{
    private VideoRepository $videoRepository;

    public function __construct(VideoRepository $videoRepo)
    {
        $this->videoRepository = $videoRepo;
    }

    public function index(int $video)
    {
        $perguntas = $this->videoRepository->find($video)->perguntas()->get();

        if (!$perguntas->count()) {
            return $this->sendError('Nenhum relacionamento encontrado', 200);
        }

        $video = $this->videoRepository->find($video);

        return new VideoResource($video);
    }

    public function store(int $video, CreateVideosPerguntasRequest $request)
    {
        /** @var Video $videos */
        $videos = $this->videoRepository->find($video);
        ['id_perguntas' => $idPerguntas, 'aparecer_em' => $aparecerEm] = $request->only('id_perguntas', 'aparecer_em');
        $videos->perguntas()->attach([$idPerguntas => ['aparecer_em' => $aparecerEm]]);

        return $this->sendResponse($videos->toArray(), 'Videos retrieved successfully');
    }
}
