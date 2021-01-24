<?php declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateRespostaAPIRequest;
use App\Http\Requests\API\UpdateRespostaAPIRequest;
use App\Models\Resposta;
use App\Repositories\RespostaRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use Response;

/**
 * Class RespostaController
 * @package App\Http\Controllers\API
 */
class RespostaAPIController extends AppBaseController
{
    /** @var  RespostaRepository */
    private $respostaRepository;

    public function __construct(RespostaRepository $respostaRepo)
    {
        $this->respostaRepository = $respostaRepo;
    }

    /**
     * @param Request $request
     * @return Response
     * @SWG\Get(
     *      path="/respostas",
     *      summary="Get a listing of the Respostas.",
     *      tags={"Resposta"},
     *      description="Get all Respostas",
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
     *                  @SWG\Items(ref="#/definitions/Resposta")
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
        $respostas = $this->respostaRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($respostas->toArray(), 'Respostas retrieved successfully');
    }

    /**
     * @param CreateRespostaAPIRequest $request
     * @return Response
     * @SWG\Post(
     *      path="/respostas",
     *      summary="Store a newly created Resposta in storage",
     *      tags={"Resposta"},
     *      description="Store Resposta",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Resposta that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Resposta")
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
     *                  ref="#/definitions/Resposta"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateRespostaAPIRequest $request)
    {
        $input = $request->all();

        $resposta = $this->respostaRepository->create($input);

        return $this->sendResponse($resposta->toArray(), 'Resposta saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     * @SWG\Get(
     *      path="/respostas/{id}",
     *      summary="Display the specified Resposta",
     *      tags={"Resposta"},
     *      description="Get Resposta",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Resposta",
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
     *                  ref="#/definitions/Resposta"
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
        /** @var Resposta $resposta */
        $resposta = $this->respostaRepository->find($id);

        if (empty($resposta)) {
            return $this->sendError('Resposta not found');
        }

        return $this->sendResponse($resposta->toArray(), 'Resposta retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateRespostaAPIRequest $request
     * @return Response
     * @SWG\Put(
     *      path="/respostas/{id}",
     *      summary="Update the specified Resposta in storage",
     *      tags={"Resposta"},
     *      description="Update Resposta",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Resposta",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Resposta that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Resposta")
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
     *                  ref="#/definitions/Resposta"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateRespostaAPIRequest $request)
    {
        $input = $request->all();

        /** @var Resposta $resposta */
        $resposta = $this->respostaRepository->find($id);

        if (empty($resposta)) {
            return $this->sendError('Resposta not found');
        }

        $resposta = $this->respostaRepository->update($input, $id);

        return $this->sendResponse($resposta->toArray(), 'Resposta updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     * @SWG\Delete(
     *      path="/respostas/{id}",
     *      summary="Remove the specified Resposta from storage",
     *      tags={"Resposta"},
     *      description="Delete Resposta",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Resposta",
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
        /** @var Resposta $resposta */
        $resposta = $this->respostaRepository->find($id);

        if (empty($resposta)) {
            return $this->sendError('Resposta not found');
        }

        $resposta->delete();

        return $this->sendSuccess('Resposta deleted successfully');
    }
}
