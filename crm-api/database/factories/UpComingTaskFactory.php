<?php

namespace Database\Factories;

use App\Models\UpComingTask;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UpComingTaskFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = UpComingTask::class;

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
