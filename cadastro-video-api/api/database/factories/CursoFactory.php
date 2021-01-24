<?php declare(strict_types=1);

namespace Database\Factories;

use App\Models\Curso;
use Illuminate\Database\Eloquent\Factories\Factory;

class CursoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     * @var string
     */
    protected $model = Curso::class;

    /**
     * Define the model's default state.
     * @return array
     */
    public function definition()
    {
        return [
            'nome_curso'      => $this->faker->word,
            'descricao_curso' => $this->faker->word,
            'imagem_curso'    => $this->faker->unique()->word,
            'ativo'           => $this->faker->boolean,
        ];
    }
}
