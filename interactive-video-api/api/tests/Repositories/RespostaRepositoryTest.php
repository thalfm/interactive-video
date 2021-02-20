<?php namespace Tests\Repositories;

use App\Models\Resposta;
use App\Repositories\RespostaRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\ApiTestTrait;

class RespostaRepositoryTest extends TestCase
{
    use ApiTestTrait, DatabaseTransactions;

    const MODEL = Resposta::class;
    /**
     * @var RespostaRepository
     */
    protected $respostaRepo;

    public function setUp() : void
    {
        parent::setUp();
        $this->respostaRepo = \App::make(RespostaRepository::class);
    }

    /**
     * @test create
     */
    public function test_create_resposta()
    {
        $resposta = Resposta::factory()->make()->toArray();

        $createdResposta = $this->respostaRepo->create($resposta);

        $createdResposta = $createdResposta->toArray();
        $this->assertArrayHasKey('id_perguntas', $createdResposta);
        $this->assertNotNull($createdResposta['id_perguntas'], 'Created Resposta must have id specified');
        $this->assertNotNull(Resposta::find($createdResposta['id_perguntas']), 'Resposta with given id must be in DB');
        $this->assertModelData($resposta, $createdResposta);
    }

    /**
     * @test read
     */
    public function test_read_resposta()
    {
        $resposta = Resposta::factory()->create();

        $dbResposta = $this->respostaRepo->find($resposta->id_perguntas);

        $dbResposta = $dbResposta->toArray();
        $this->assertModelData($resposta->toArray(), $dbResposta);
    }

    /**
     * @test update
     */
    public function test_update_resposta()
    {
        $resposta = Resposta::factory()->create();
        $fakeResposta = Resposta::factory()->make()->toArray();

        $updatedResposta = $this->respostaRepo->update($fakeResposta, $resposta->id_perguntas);

        $this->assertModelData($fakeResposta, $updatedResposta->toArray());
        $dbResposta = $this->respostaRepo->find($resposta->id_perguntas);
        $this->assertModelData($fakeResposta, $dbResposta->toArray());
    }

    /**
     * @test delete
     */
    public function test_delete_resposta()
    {
        $resposta = Resposta::factory()->create();

        $resp = $this->respostaRepo->delete($resposta->id_perguntas);

        $this->assertTrue($resp);
        $this->assertNull(Resposta::find($resposta->id_perguntas), 'Resposta should not exist in DB');
    }
}
