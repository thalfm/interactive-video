<?php declare(strict_types=1);

namespace Database\Factories;

use App\Models\Pergunta;
use App\Models\Resposta;
use Illuminate\Database\Eloquent\Factories\Factory;

class RespostaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     * @var string
     */
    protected $model = Resposta::class;

    /**
     * Define the model's default state.
     * @return array
     */
    public function definition()
    {
        return [
            'id_perguntas'       => Pergunta::factory()->create()->first()->id_perguntas,
            'descricao_resposta' => $this->faker->word,
            'correta'            => $this->faker->boolean,
            'ativo'              => $this->faker->boolean,
        ];
    }
}
