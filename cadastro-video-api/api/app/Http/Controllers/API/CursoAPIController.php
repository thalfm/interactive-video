<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateCursoAPIRequest;
use App\Http\Requests\API\UpdateCursoAPIRequest;
use App\Models\Curso;
use App\Repositories\CursoRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use Response;

/**
 * Class CursoController
 * @package App\Http\Controllers\API
 */
class CursoAPIController extends AppBaseController
{
    /** @var  CursoRepository */
    private $cursoRepository;

    public function __construct(CursoRepository $cursoRepo)
    {
        $this->cursoRepository = $cursoRepo;
    }

    /**
     * @param Request $request
     * @return Response
     * @SWG\Get(
     *      path="/cursos",
     *      summary="Get a listing of the Cursos.",
     *      tags={"Curso"},
     *      description="Get all Cursos",
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
     *                  @SWG\Items(ref="#/definitions/Curso")
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
        $cursos = $this->cursoRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($cursos->toArray(), 'Cursos retrieved successfully');
    }

    /**
     * @param CreateCursoAPIRequest $request
     * @return Response
     * @SWG\Post(
     *      path="/cursos",
     *      summary="Store a newly created Curso in storage",
     *      tags={"Curso"},
     *      description="Store Curso",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Curso that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Curso")
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
     *                  ref="#/definitions/Curso"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateCursoAPIRequest $request)
    {
        $input = $request->all();

        $curso = $this->cursoRepository->create($input);

        return $this->sendResponse($curso->toArray(), 'Curso saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     * @SWG\Get(
     *      path="/cursos/{id}",
     *      summary="Display the specified Curso",
     *      tags={"Curso"},
     *      description="Get Curso",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Curso",
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
     *                  ref="#/definitions/Curso"
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
        /** @var Curso $curso */
        $curso = $this->cursoRepository->find($id);

        if (empty($curso)) {
            return $this->sendError('Curso not found');
        }

        return $this->sendResponse($curso->toArray(), 'Curso retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateCursoAPIRequest $request
     * @return Response
     * @SWG\Put(
     *      path="/cursos/{id}",
     *      summary="Update the specified Curso in storage",
     *      tags={"Curso"},
     *      description="Update Curso",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Curso",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Curso that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Curso")
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
     *                  ref="#/definitions/Curso"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateCursoAPIRequest $request)
    {
        $input = $request->all();

        /** @var Curso $curso */
        $curso = $this->cursoRepository->find($id);

        if (empty($curso)) {
            return $this->sendError('Curso not found');
        }

        $curso = $this->cursoRepository->update($input, $id);

        return $this->sendResponse($curso->toArray(), 'Curso updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     * @SWG\Delete(
     *      path="/cursos/{id}",
     *      summary="Remove the specified Curso from storage",
     *      tags={"Curso"},
     *      description="Delete Curso",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Curso",
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
        /** @var Curso $curso */
        $curso = $this->cursoRepository->find($id);

        if (empty($curso)) {
            return $this->sendError('Curso not found');
        }

        $curso->delete();

        return $this->sendSuccess('Curso deleted successfully');
    }
}
