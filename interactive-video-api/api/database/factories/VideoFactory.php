<?php declare(strict_types=1);

namespace Database\Factories;

use App\Models\Video;
use Illuminate\Database\Eloquent\Factories\Factory;

class VideoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     * @var string
     */
    protected $model = Video::class;

    /**
     * Define the model's default state.
     * @return array
     */
    public function definition()
    {
        return [
            'titulo_video' => $this->faker->word,
            'nome_video'   => $this->faker->word,
            'ativo'        => $this->faker->boolean,
        ];
    }
}
