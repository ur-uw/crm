<?php

namespace Database\Factories;

use App\Models\Status;
use Illuminate\Database\Eloquent\Factories\Factory;
use Str;

class StatusFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Status::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $statues = ['waiting', 'approved', 'inprogress', 'completed', 'denied'];
        $status = $this->faker->unique()->randomElement($statues);
        return [
            'name' => $status,
            'color' => $this->faker->hexColor(),
        ];
    }

    public function waiting()
    {
        return $this->state(function () {
            return [
                'name' => 'Waiting',
                'color' => "#ffbf0e",
            ];
        });
    }
    public function approved()
    {
        return $this->state(function () {
            return [
                'name' => 'Approved',
                'color' => "#15d4a150",
            ];
        });
    }


    public function inprogress()
    {
        return $this->state(function () {
            return [
                'name' => 'Inprogress',
                'color' => "#0060ff20",
            ];
        });
    }
    public function completed()
    {
        return $this->state(function () {
            return [
                'name' => 'Completed',
                'color' => "#894fc6",
            ];
        });
    }

    public function rejected()
    {
        return $this->state(function () {
            return [
                'name' => 'Rejected',
                'color' => "#ff0e4620",
            ];
        });
    }
}
