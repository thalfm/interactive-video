<?php declare(strict_types=1);

namespace Database\Factories;

use App\Models\Pergunta;
use Illuminate\Database\Eloquent\Factories\Factory;

class PerguntaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     * @var string
     */
    protected $model = Pergunta::class;

    /**
     * Define the model's default state.
     * @return array
     */
    public function definition()
    {
        return [
            'descricao_pergunta' => $this->faker->word,
            'ativo'              => $this->faker->boolean,
        ];
    }
}
