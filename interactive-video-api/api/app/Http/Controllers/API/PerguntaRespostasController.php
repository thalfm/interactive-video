<?php declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Requests\API\CreatePerguntaRespostaAPIRequest;
use App\Http\Requests\API\UpdatePerguntaRespostaAPIRequest;
use App\Repositories\RespostaRepository;
use Illuminate\Http\Request;

class PerguntaRespostasController extends AppBaseController
{
    /** @var  RespostaRepository */
    private $respostaRepository;

    public function __construct(RespostaRepository $respostaRepo)
    {
        $this->respostaRepository = $respostaRepo;
    }

    public function index(int $pergunta, Request $request)
    {
        $respostas = $this->respostaRepository->all(
            ['id_perguntas' => $pergunta],
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($respostas->toArray(), 'Respostas retrieved successfully');
    }

    public function store(int $pergunta, CreatePerguntaRespostaAPIRequest $request)
    {
        $input = $request->all();

        $resposta = $this->respostaRepository->create(array_merge($input, ['id_perguntas' => $pergunta]));

        return $this->sendResponse($resposta->toArray(), 'Resposta saved successfully');
    }

    public function show(int $pergunta, int $resposta)
    {
        $resposta = $this->respostaRepository->find($resposta);

        if ($resposta->id_perguntas != $pergunta) {
            return $this->sendError('Resposta not found');
        }

        if (empty($resposta)) {
            return $this->sendError('Resposta not found');
        }

        return $this->sendResponse($resposta->toArray(), 'Resposta retrieved successfully');
    }

    public function update(int $pergunta, int $idResposta, UpdatePerguntaRespostaAPIRequest $request)
    {
        $input = $request->all();

        $resposta = $this->respostaRepository->find($idResposta);

        if ($resposta->id_perguntas != $pergunta) {
            return $this->sendError('Resposta not found');
        }

        if (empty($resposta)) {
            return $this->sendError('Resposta not found');
        }

        $resposta = $this->respostaRepository->update($input, $idResposta);

        return $this->sendResponse($resposta->toArray(), 'Resposta updated successfully');
    }
}
