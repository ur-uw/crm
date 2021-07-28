<?php

namespace Database\Factories;

use App\Models\Task;
use Date;
use DateInterval;
use Illuminate\Database\Eloquent\Factories\Factory;
use Str;

class TaskFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Task::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $title = $this->faker->sentence($nbWords = 5, $variableWords = false);
        $task_created_at = $this->faker->dateTimeBetween('-3 month', '-1 day');
        $due_date = $this->faker->dateTimeBetween($task_created_at, '+1 month');
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'start_date' => $this->faker->dateTimeBetween($task_created_at, $due_date),
            'due_date' => $due_date,
            'description' => $this->faker->text(100),
            'created_at' => $task_created_at,
            'updated_at' => $this->faker->dateTimeBetween($task_created_at, now())
        ];
    }
}
