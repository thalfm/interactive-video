<?php namespace Tests\APIs;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\ApiTestTrait;
use App\Models\Usuario;

class UsuarioApiTest extends TestCase
{
    use ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    const MODEL = Usuario::class;
    /**
     * @test
     */
    public function test_create_usuario()
    {
        $usuario = Usuario::factory()->make()->toArray();

        $this->response = $this->json(
            'POST',
            '/api/v1/usuarios', $usuario
        );

        $this->assertApiResponse($usuario);
    }

    /**
     * @test
     */
    public function test_read_usuario()
    {
        $usuario = Usuario::factory()->create();

        $this->response = $this->json(
            'GET',
            '/api/v1/usuarios/'.$usuario->id_usuarios
        );

        $this->assertApiResponse($usuario->toArray());
    }

    /**
     * @test
     */
    public function test_update_usuario()
    {
        $usuario = Usuario::factory()->create();
        $editedUsuario = Usuario::factory()->make()->toArray();

        $this->response = $this->json(
            'PUT',
            '/api/v1/usuarios/'.$usuario->id_usuarios,
            $editedUsuario
        );

        $this->assertApiResponse($editedUsuario);
    }

    /**
     * @test
     */
    public function test_delete_usuario()
    {
        $usuario = Usuario::factory()->create();

        $this->response = $this->json(
            'DELETE',
             '/api/v1/usuarios/'.$usuario->id_usuarios
         );

        $this->assertApiSuccess();
        $this->response = $this->json(
            'GET',
            '/api/v1/usuarios/'.$usuario->id_usuarios
        );

        $this->response->assertStatus(404);
    }
}
