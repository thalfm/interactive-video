<?php namespace Tests\Repositories;

use App\Models\Usuario;
use App\Repositories\UsuarioRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\ApiTestTrait;

class UsuarioRepositoryTest extends TestCase
{
    use ApiTestTrait, DatabaseTransactions;

    const MODEL = Usuario::class;
    /**
     * @var UsuarioRepository
     */
    protected $usuarioRepo;

    public function setUp() : void
    {
        parent::setUp();
        $this->usuarioRepo = \App::make(UsuarioRepository::class);
    }

    /**
     * @test create
     */
    public function test_create_usuario()
    {
        $usuario = Usuario::factory()->make()->toArray();

        $createdUsuario = $this->usuarioRepo->create($usuario);

        $createdUsuario = $createdUsuario->toArray();
        $this->assertArrayHasKey('id_usuarios', $createdUsuario);
        $this->assertNotNull($createdUsuario['id_usuarios'], 'Created Usuario must have id specified');
        $this->assertNotNull(Usuario::find($createdUsuario['id_usuarios']), 'Usuario with given id must be in DB');
        $this->assertModelData($usuario, $createdUsuario);
    }

    /**
     * @test read
     */
    public function test_read_usuario()
    {
        $usuario = Usuario::factory()->create();

        $dbUsuario = $this->usuarioRepo->find($usuario->id_usuarios);

        $dbUsuario = $dbUsuario->toArray();
        $this->assertModelData($usuario->toArray(), $dbUsuario);
    }

    /**
     * @test update
     */
    public function test_update_usuario()
    {
        $usuario = Usuario::factory()->create();
        $fakeUsuario = Usuario::factory()->make()->toArray();

        $updatedUsuario = $this->usuarioRepo->update($fakeUsuario, $usuario->id_usuarios);

        $this->assertModelData($fakeUsuario, $updatedUsuario->toArray());
        $dbUsuario = $this->usuarioRepo->find($usuario->id_usuarios);
        $this->assertModelData($fakeUsuario, $dbUsuario->toArray());
    }

    /**
     * @test delete
     */
    public function test_delete_usuario()
    {
        $usuario = Usuario::factory()->create();

        $resp = $this->usuarioRepo->delete($usuario->id_usuarios);

        $this->assertTrue($resp);
        $this->assertNull(Usuario::find($usuario->id_usuarios), 'Usuario should not exist in DB');
    }
}
