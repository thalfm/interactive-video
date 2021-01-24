<?php declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateUsuarioAPIRequest;
use App\Http\Requests\API\UpdateUsuarioAPIRequest;
use App\Models\Usuario;
use App\Repositories\UsuarioRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use Response;

/**
 * Class UsuarioController
 * @package App\Http\Controllers\API
 */

class UsuarioAPIController extends AppBaseController
{
    /** @var  UsuarioRepository */
    private $usuarioRepository;

    public function __construct(UsuarioRepository $usuarioRepo)
    {
        $this->usuarioRepository = $usuarioRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/usuarios",
     *      summary="Get a listing of the Usuarios.",
     *      tags={"Usuario"},
     *      description="Get all Usuarios",
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
     *                  @SWG\Items(ref="#/definitions/Usuario")
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
        $usuarios = $this->usuarioRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($usuarios->toArray(), 'Usuarios retrieved successfully');
    }

    /**
     * @param CreateUsuarioAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/usuarios",
     *      summary="Store a newly created Usuario in storage",
     *      tags={"Usuario"},
     *      description="Store Usuario",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Usuario that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Usuario")
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
     *                  ref="#/definitions/Usuario"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateUsuarioAPIRequest $request)
    {
        $input = $request->all();

        $usuario = $this->usuarioRepository->create($input);

        return $this->sendResponse($usuario->toArray(), 'Usuario saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/usuarios/{id}",
     *      summary="Display the specified Usuario",
     *      tags={"Usuario"},
     *      description="Get Usuario",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Usuario",
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
     *                  ref="#/definitions/Usuario"
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
        /** @var Usuario $usuario */
        $usuario = $this->usuarioRepository->find($id);

        if (empty($usuario)) {
            return $this->sendError('Usuario not found');
        }

        return $this->sendResponse($usuario->toArray(), 'Usuario retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateUsuarioAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/usuarios/{id}",
     *      summary="Update the specified Usuario in storage",
     *      tags={"Usuario"},
     *      description="Update Usuario",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Usuario",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Usuario that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Usuario")
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
     *                  ref="#/definitions/Usuario"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateUsuarioAPIRequest $request)
    {
        $input = $request->all();

        /** @var Usuario $usuario */
        $usuario = $this->usuarioRepository->find($id);

        if (empty($usuario)) {
            return $this->sendError('Usuario not found');
        }

        $usuario = $this->usuarioRepository->update($input, $id);

        return $this->sendResponse($usuario->toArray(), 'Usuario updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/usuarios/{id}",
     *      summary="Remove the specified Usuario from storage",
     *      tags={"Usuario"},
     *      description="Delete Usuario",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Usuario",
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
        /** @var Usuario $usuario */
        $usuario = $this->usuarioRepository->find($id);

        if (empty($usuario)) {
            return $this->sendError('Usuario not found');
        }

        $usuario->delete();

        return $this->sendSuccess('Usuario deleted successfully');
    }
}
