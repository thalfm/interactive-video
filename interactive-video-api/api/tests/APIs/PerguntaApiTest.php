<?php namespace Tests\APIs;

use App\Models\Pergunta;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\ApiTestTrait;
use Tests\TestCase;

class PerguntaApiTest extends TestCase
{
    use ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    const MODEL = Pergunta::class;
    /**
     * @test
     */
    public function test_create_pergunta()
    {
        $pergunta = Pergunta::factory()->make()->toArray();

        $this->response = $this->json(
            'POST',
            '/api/v1/perguntas', $pergunta
        );

        $this->assertApiResponse($pergunta);
    }

    /**
     * @test
     */
    public function test_read_pergunta()
    {
        $pergunta = Pergunta::factory()->create();

        $this->response = $this->json(
            'GET',
            '/api/v1/perguntas/'.$pergunta->id_perguntas
        );

        $this->assertApiResponse($pergunta->toArray());
    }

    /**
     * @test
     */
    public function test_update_pergunta()
    {
        $pergunta = Pergunta::factory()->create();
        $editedPergunta = Pergunta::factory()->make()->toArray();

        $this->response = $this->json(
            'PUT',
            '/api/v1/perguntas/'.$pergunta->id_perguntas,
            $editedPergunta
        );

        $this->assertApiResponse($editedPergunta);
    }

    /**
     * @test
     */
    public function test_delete_pergunta()
    {
        $pergunta = Pergunta::factory()->create();

        $this->response = $this->json(
            'DELETE',
             '/api/v1/perguntas/'.$pergunta->id_perguntas
         );

        $this->assertApiSuccess();
        $this->response = $this->json(
            'GET',
            '/api/v1/perguntas/'.$pergunta->id_perguntas
        );

        $this->response->assertStatus(404);
    }
}
