<?php

namespace Database\Factories;

use App\Models\Image;
use Illuminate\Database\Eloquent\Factories\Factory;
use Str;

class ImageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Image::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {

        //? IMAGE API 'https://api.generated.photos/api/v1/faces?api_key=jAI-kWTB5_j0enmmgC-uwQ'
        // 'abstract', 'animals', 'business', 'cats', 'city', 'food', 'nightlife',
        // 'fashion', 'people', 'nature', 'sports', 'technics', 'transport'
        $image_categories = [
            'abstract', 'animals', 'business', 'nightlife',
            'people', 'nature', 'sports', 'technics',
        ];
        $image_name = $this->faker->words(2, true) . ' IMAGE';
        return [
            'name' => $image_name,
            'path' => 'https://picsum.photos/200',
        ];
    }
}
