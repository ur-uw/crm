<?php

namespace Database\Factories;

use App\Models\Upcoming;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UpcomingFactory extends Factory
{


    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Upcoming::class;

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
            'waiting' => true,
            'taskId' => Str::random($length = 10),
        ];
    }
}