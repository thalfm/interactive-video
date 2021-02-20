<?php namespace Tests\Repositories;

use App\Models\Video;
use App\Repositories\VideoRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\ApiTestTrait;

class VideoRepositoryTest extends TestCase
{
    use ApiTestTrait, DatabaseTransactions;

    const MODEL = Video::class;
    /**
     * @var VideoRepository
     */
    protected $videoRepo;

    public function setUp() : void
    {
        parent::setUp();
        $this->videoRepo = \App::make(VideoRepository::class);
    }

    /**
     * @test create
     */
    public function test_create_video()
    {
        $video = Video::factory()->make()->toArray();

        $createdVideo = $this->videoRepo->create($video);

        $createdVideo = $createdVideo->toArray();
        $this->assertArrayHasKey('id_videos', $createdVideo);
        $this->assertNotNull($createdVideo['id_videos'], 'Created Video must have id specified');
        $this->assertNotNull(Video::find($createdVideo['id_videos']), 'Video with given id must be in DB');
        $this->assertModelData($video, $createdVideo);
    }

    /**
     * @test read
     */
    public function test_read_video()
    {
        $video = Video::factory()->create();

        $dbVideo = $this->videoRepo->find($video->id_videos);

        $dbVideo = $dbVideo->toArray();
        $this->assertModelData($video->toArray(), $dbVideo);
    }

    /**
     * @test update
     */
    public function test_update_video()
    {
        $video = Video::factory()->create();
        $fakeVideo = Video::factory()->make()->toArray();

        $updatedVideo = $this->videoRepo->update($fakeVideo, $video->id_videos);

        $this->assertModelData($fakeVideo, $updatedVideo->toArray());
        $dbVideo = $this->videoRepo->find($video->id_videos);
        $this->assertModelData($fakeVideo, $dbVideo->toArray());
    }

    /**
     * @test delete
     */
    public function test_delete_video()
    {
        $video = Video::factory()->create();

        $resp = $this->videoRepo->delete($video->id_videos);

        $this->assertTrue($resp);
        $this->assertNull(Video::find($video->id_videos), 'Video should not exist in DB');
    }
}
