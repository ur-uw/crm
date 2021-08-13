<?php

namespace Database\Factories;

use App\Models\Priority;
use Illuminate\Database\Eloquent\Factories\Factory;
use Str;

class PriorityFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Priority::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $name = $this->faker->word();
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'color' => $this->faker->hexColor()
        ];
    }
}
