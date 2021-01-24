<?php declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreatePerguntaAPIRequest;
use App\Http\Requests\API\UpdatePerguntaAPIRequest;
use App\Models\Pergunta;
use App\Repositories\PerguntaRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use Response;

/**
 * Class PerguntaController
 * @package App\Http\Controllers\API
 */
class PerguntaAPIController extends AppBaseController
{
    /** @var  PerguntaRepository */
    private $perguntaRepository;

    public function __construct(PerguntaRepository $perguntaRepo)
    {
        $this->perguntaRepository = $perguntaRepo;
    }

    /**
     * @param Request $request
     * @return Response
     * @SWG\Get(
     *      path="/perguntas",
     *      summary="Get a listing of the Perguntas.",
     *      tags={"Pergunta"},
     *      description="Get all Perguntas",
     *      produces={"application/json"},
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  type="array",
     *                  @SWG\Items(ref="#/definitions/Pergunta")
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function index(Request $request)
    {
        $perguntas = $this->perguntaRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($perguntas->toArray(), 'Perguntas retrieved successfully');
    }

    /**
     * @param CreatePerguntaAPIRequest $request
     * @return Response
     * @SWG\Post(
     *      path="/perguntas",
     *      summary="Store a newly created Pergunta in storage",
     *      tags={"Pergunta"},
     *      description="Store Pergunta",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Pergunta that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Pergunta")
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  ref="#/definitions/Pergunta"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreatePerguntaAPIRequest $request)
    {
        $input = $request->all();

        $pergunta = $this->perguntaRepository->create($input);

        return $this->sendResponse($pergunta->toArray(), 'Pergunta saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     * @SWG\Get(
     *      path="/perguntas/{id}",
     *      summary="Display the specified Pergunta",
     *      tags={"Pergunta"},
     *      description="Get Pergunta",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Pergunta",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  ref="#/definitions/Pergunta"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function show($id)
    {
        /** @var Pergunta $pergunta */
        $pergunta = $this->perguntaRepository->find($id);

        if (empty($pergunta)) {
            return $this->sendError('Pergunta not found');
        }

        return $this->sendResponse($pergunta->toArray(), 'Pergunta retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdatePerguntaAPIRequest $request
     * @return Response
     * @SWG\Put(
     *      path="/perguntas/{id}",
     *      summary="Update the specified Pergunta in storage",
     *      tags={"Pergunta"},
     *      description="Update Pergunta",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Pergunta",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Pergunta that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Pergunta")
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  ref="#/definitions/Pergunta"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdatePerguntaAPIRequest $request)
    {
        $input = $request->all();

        /** @var Pergunta $pergunta */
        $pergunta = $this->perguntaRepository->find($id);

        if (empty($pergunta)) {
            return $this->sendError('Pergunta not found');
        }

        $pergunta = $this->perguntaRepository->update($input, $id);

        return $this->sendResponse($pergunta->toArray(), 'Pergunta updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     * @SWG\Delete(
     *      path="/perguntas/{id}",
     *      summary="Remove the specified Pergunta from storage",
     *      tags={"Pergunta"},
     *      description="Delete Pergunta",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Pergunta",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  type="string"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function destroy($id)
    {
        /** @var Pergunta $pergunta */
        $pergunta = $this->perguntaRepository->find($id);

        if (empty($pergunta)) {
            return $this->sendError('Pergunta not found');
        }

        $pergunta->delete();

        return $this->sendSuccess('Pergunta deleted successfully');
    }
}
