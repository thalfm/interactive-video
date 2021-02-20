<?php namespace Tests\APIs;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\ApiTestTrait;
use App\Models\Video;

class VideoApiTest extends TestCase
{
    use ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    const MODEL = Video::class;
    /**
     * @test
     */
    public function test_create_video()
    {
        $video = Video::factory()->make()->toArray();

        $this->response = $this->json(
            'POST',
            '/api/v1/videos', $video
        );

        $this->assertApiResponse($video);
    }

    /**
     * @test
     */
    public function test_read_video()
    {
        $video = Video::factory()->create();

        $this->response = $this->json(
            'GET',
            '/api/v1/videos/'.$video->id_videos
        );

        $this->assertApiResponse($video->toArray());
    }

    /**
     * @test
     */
    public function test_update_video()
    {
        $video = Video::factory()->create();
        $editedVideo = Video::factory()->make()->toArray();

        $this->response = $this->json(
            'PUT',
            '/api/v1/videos/'.$video->id_videos,
            $editedVideo
        );

        $this->assertApiResponse($editedVideo);
    }

    /**
     * @test
     */
    public function test_delete_video()
    {
        $video = Video::factory()->create();

        $this->response = $this->json(
            'DELETE',
             '/api/v1/videos/'.$video->id_videos
         );

        $this->assertApiSuccess();
        $this->response = $this->json(
            'GET',
            '/api/v1/videos/'.$video->id_videos
        );

        $this->response->assertStatus(404);
    }
}
