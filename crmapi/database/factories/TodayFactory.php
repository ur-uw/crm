<?php

namespace Database\Factories;

use App\Models\Today;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TodayFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Today::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence($nbWords = 4, $variableWords = false),
            'completed' => false,
            'approved' => false,
            'taskId' => Str::random($length = 10),
        ];
    }
}