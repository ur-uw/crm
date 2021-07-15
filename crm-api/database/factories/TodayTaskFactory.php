<?php

namespace Database\Factories;

use App\Models\TodayTask;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;


class TodayTaskFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = TodayTask::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $taskStatus = [
            'inprogress',
            'completed',
        ];
        return [
            'title' => $this->faker->sentence($nbWords = 4, $variableWords = false),
            'status' => $this->faker->randomElement($taskStatus),
            'taskId' => Str::random($length = 10),
        ];
    }
}
