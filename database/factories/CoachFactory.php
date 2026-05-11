<?php

namespace Database\Factories;

use App\Models\Coach;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends \Illuminate\Database\Eloquent\Factories\Factory<Coach> */
class CoachFactory extends Factory
{
    protected $model = Coach::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'specialization' => $this->faker->randomElement(['Strength', 'Cardio', 'Nutrition', 'Yoga']),
            'bio' => $this->faker->paragraph,
            'certifications' => $this->faker->words(3, true),
            'experience_years' => $this->faker->numberBetween(1, 15),
            'clients_count' => $this->faker->numberBetween(5, 50),
            'rating' => $this->faker->randomFloat(2, 3, 5),
            'is_available' => $this->faker->boolean,
            'hourly_rate' => $this->faker->randomFloat(2, 20, 150),
            'avatar' => $this->faker->imageUrl(200, 200, 'people'),
            'expertise_areas' => $this->faker->randomElements(['Strength', 'Cardio', 'Flexibility', 'Nutrition'], $this->faker->numberBetween(1, 3)),
        ];
    }
}
