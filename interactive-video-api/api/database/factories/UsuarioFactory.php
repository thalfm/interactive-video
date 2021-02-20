<?php declare(strict_types=1);

namespace Database\Factories;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Factories\Factory;

class UsuarioFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     * @var string
     */
    protected $model = Usuario::class;

    /**
     * Define the model's default state.
     * @return array
     */
    public function definition()
    {
        return [
            'nome_usuario' => $this->faker->word,
            'email'        => $this->faker->word,
            'senha'        => $this->faker->word,
            'ativo'        => $this->faker->boolean,
        ];
    }
}
