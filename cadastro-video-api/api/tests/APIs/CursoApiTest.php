<?php namespace Tests\APIs;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\ApiTestTrait;
use App\Models\Curso;

class CursoApiTest extends TestCase
{
    const MODEL = Curso::class;

    use ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function test_create_curso()
    {
        $curso = Curso::factory()->make()->toArray();

        $this->response = $this->json(
            'POST',
            '/api/v1/cursos', $curso
        );

        $this->assertApiResponse($curso);
    }

    /**
     * @test
     */
    public function test_read_curso()
    {
        $curso = Curso::factory()->create();

        $this->response = $this->json(
            'GET',
            '/api/v1/cursos/'.$curso->id_cursos
        );

        $this->assertApiResponse($curso->toArray());
    }

    /**
     * @test
     */
    public function test_update_curso()
    {
        $curso = Curso::factory()->create();
        $editedCurso = Curso::factory()->make()->toArray();

        $this->response = $this->json(
            'PUT',
            '/api/v1/cursos/'.$curso->id_cursos,
            $editedCurso
        );

        $this->assertApiResponse($editedCurso);
    }

    /**
     * @test
     */
    public function test_delete_curso()
    {
        $curso = Curso::factory()->create();

        $this->response = $this->json(
            'DELETE',
             '/api/v1/cursos/'.$curso->id_cursos
         );

        $this->assertApiSuccess();
        $this->response = $this->json(
            'GET',
            '/api/v1/cursos/'.$curso->id_cursos
        );

        $this->response->assertStatus(404);
    }
}
