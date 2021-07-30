<?php

namespace Database\Factories;

use App\Models\Address;
use Illuminate\Database\Eloquent\Factories\Factory;

class AddressFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Address::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->unique()->company(),
            'address1' => $this->faker->streetAddress(),
            'address2' => $this->faker->streetAddress(),
            'state' => $this->faker->country(),
            'city' => $this->faker->city(),
            'zip' => (int)$this->faker->postcode(),
        ];
    }
}