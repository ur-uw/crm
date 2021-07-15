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
        $taskStatus = [
            'waiting',
            'approved',
            'inprogress',
            'completed',
            'denied'
        ];
        return [
            'title' => $this->faker->sentence($nbWords = 4, $variableWords = false),
            'status' => $this->faker->randomElement($taskStatus),
            'taskId' => Str::random($length = 10),
        ];
    }
}
