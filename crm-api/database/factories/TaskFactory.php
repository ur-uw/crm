<?php

namespace Database\Factories;

use App\Models\Task;
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
        $date_format = 'Y-m-d';
        $due_date = $this->faker->date;
        return [

            'title' => $title,
            'slug' => Str::slug($title),
            'start_date' => $this->faker->date($date_format, $due_date),
            'due_date' => $due_date,
            'description' => $this->faker->text(100),
        ];
    }
}
