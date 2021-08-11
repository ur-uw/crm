<?php

namespace Database\Factories;

use App\Models\Team;
use Illuminate\Database\Eloquent\Factories\Factory;
use Str;

class TeamFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Team::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $display_name = $this->faker->name() . ' TEAM';
        return [
            'name' => Str::slug($display_name),
            'display_name' => $display_name,
            'description' => $this->faker->realText()
        ];
    }
}
