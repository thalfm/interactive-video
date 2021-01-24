<?php declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateVideoAPIRequest;
use App\Http\Requests\API\UpdateVideoAPIRequest;
use App\Models\Video;
use App\Repositories\VideoRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use Response;

/**
 * Class VideoController
 * @package App\Http\Controllers\API
 */
class VideoAPIController extends AppBaseController
{
    /** @var  VideoRepository */
    private $videoRepository;

    public function __construct(VideoRepository $videoRepo)
    {
        $this->videoRepository = $videoRepo;
    }

    /**
     * @param Request $request
     * @return Response
     * @SWG\Get(
     *      path="/videos",
     *      summary="Get a listing of the Videos.",
     *      tags={"Video"},
     *      description="Get all Videos",
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
     *                  @SWG\Items(ref="#/definitions/Video")
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
        $videos = $this->videoRepository->all(
            $request->except(['skip', 'limit']),
            $request->get('skip'),
            $request->get('limit')
        );

        return $this->sendResponse($videos->toArray(), 'Videos retrieved successfully');
    }

    /**
     * @param CreateVideoAPIRequest $request
     * @return Response
     * @SWG\Post(
     *      path="/videos",
     *      summary="Store a newly created Video in storage",
     *      tags={"Video"},
     *      description="Store Video",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Video that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Video")
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
     *                  ref="#/definitions/Video"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateVideoAPIRequest $request)
    {
        $input = $request->all();

        $video = $this->videoRepository->create($input);

        return $this->sendResponse($video->toArray(), 'Video saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     * @SWG\Get(
     *      path="/videos/{id}",
     *      summary="Display the specified Video",
     *      tags={"Video"},
     *      description="Get Video",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Video",
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
     *                  ref="#/definitions/Video"
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
        /** @var Video $video */
        $video = $this->videoRepository->find($id);

        if (empty($video)) {
            return $this->sendError('Video not found');
        }

        return $this->sendResponse($video->toArray(), 'Video retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateVideoAPIRequest $request
     * @return Response
     * @SWG\Put(
     *      path="/videos/{id}",
     *      summary="Update the specified Video in storage",
     *      tags={"Video"},
     *      description="Update Video",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Video",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Video that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Video")
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
     *                  ref="#/definitions/Video"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateVideoAPIRequest $request)
    {
        $input = $request->all();

        /** @var Video $video */
        $video = $this->videoRepository->find($id);

        if (empty($video)) {
            return $this->sendError('Video not found');
        }

        $video = $this->videoRepository->update($input, $id);

        return $this->sendResponse($video->toArray(), 'Video updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     * @SWG\Delete(
     *      path="/videos/{id}",
     *      summary="Remove the specified Video from storage",
     *      tags={"Video"},
     *      description="Delete Video",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Video",
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
        /** @var Video $video */
        $video = $this->videoRepository->find($id);

        if (empty($video)) {
            return $this->sendError('Video not found');
        }

        $video->delete();

        return $this->sendSuccess('Video deleted successfully');
    }
}
