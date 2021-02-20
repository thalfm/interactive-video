<?php namespace Tests\APIs;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\ApiTestTrait;
use App\Models\Resposta;

class RespostaApiTest extends TestCase
{
    use ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    const MODEL = Resposta::class;
    /**
     * @test
     */
    public function test_create_resposta()
    {
        $resposta = Resposta::factory()->make()->toArray();

        $this->response = $this->json(
            'POST',
            '/api/v1/respostas', $resposta
        );

        $this->assertApiResponse($resposta);
    }

    /**
     * @test
     */
    public function test_read_resposta()
    {
        $resposta = Resposta::factory()->create();

        $this->response = $this->json(
            'GET',
            '/api/v1/respostas/'.$resposta->id_respostas
        );

        $this->assertApiResponse($resposta->toArray());
    }

    /**
     * @test
     */
    public function test_update_resposta()
    {
        $resposta = Resposta::factory()->create();
        $editedResposta = Resposta::factory()->make()->toArray();

        $this->response = $this->json(
            'PUT',
            '/api/v1/respostas/'.$resposta->id_respostas,
            $editedResposta
        );

        $this->assertApiResponse($editedResposta);
    }

    /**
     * @test
     */
    public function test_delete_resposta()
    {
        $resposta = Resposta::factory()->create();

        $this->response = $this->json(
            'DELETE',
             '/api/v1/respostas/'.$resposta->id_respostas
         );

        $this->assertApiSuccess();
        $this->response = $this->json(
            'GET',
            '/api/v1/respostas/'.$resposta->id_respostas
        );

        $this->response->assertStatus(404);
    }
}
