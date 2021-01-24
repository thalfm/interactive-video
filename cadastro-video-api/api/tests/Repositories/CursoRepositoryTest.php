<?php namespace Tests\Repositories;

use App\Models\Curso;
use App\Repositories\CursoRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\ApiTestTrait;

class CursoRepositoryTest extends TestCase
{
    use ApiTestTrait, DatabaseTransactions;

    const MODEL = Curso::class;
    /**
     * @var CursoRepository
     */
    protected $cursoRepo;

    public function setUp() : void
    {
        parent::setUp();
        $this->cursoRepo = \App::make(CursoRepository::class);
    }

    /**
     * @test create
     */
    public function test_create_curso()
    {
        $curso = Curso::factory()->make()->toArray();

        $createdCurso = $this->cursoRepo->create($curso);

        $createdCurso = $createdCurso->toArray();
        $this->assertArrayHasKey('id_cursos', $createdCurso);
        $this->assertNotNull($createdCurso['id_cursos'], 'Created Curso must have id specified');
        $this->assertNotNull(Curso::find($createdCurso['id_cursos']), 'Curso with given id must be in DB');
        $this->assertModelData($curso, $createdCurso);
    }

    /**
     * @test read
     */
    public function test_read_curso()
    {
        $curso = Curso::factory()->create();

        $dbCurso = $this->cursoRepo->find($curso->id_cursos);

        $dbCurso = $dbCurso->toArray();
        $this->assertModelData($curso->toArray(), $dbCurso);
    }

    /**
     * @test update
     */
    public function test_update_curso()
    {
        $curso = Curso::factory()->create();
        $fakeCurso = Curso::factory()->make()->toArray();

        $updatedCurso = $this->cursoRepo->update($fakeCurso, $curso->id_cursos);

        $this->assertModelData($fakeCurso, $updatedCurso->toArray());
        $dbCurso = $this->cursoRepo->find($curso->id_cursos);
        $this->assertModelData($fakeCurso, $dbCurso->toArray());
    }

    /**
     * @test delete
     */
    public function test_delete_curso()
    {
        $curso = Curso::factory()->create();

        $resp = $this->cursoRepo->delete($curso->id_cursos);

        $this->assertTrue($resp);
        $this->assertNull(Curso::find($curso->id_cursos), 'Curso should not exist in DB');
    }
}
