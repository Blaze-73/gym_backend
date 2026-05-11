<?php

namespace Database\Factories;

use App\Models\Exercise;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Exercise> */
class ExerciseFactory extends Factory
{
    protected $model = Exercise::class;

    public function definition()
    {
        return [
            'name' => $this->faker->words(2, true),
            'description' => $this->faker->sentence,
            'image' => $this->faker->imageUrl(400, 300, 'sports'),
            'video_url' => $this->faker->url,
            'muscle_group' => $this->faker->randomElement(['Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core']),
            'equipment' => $this->faker->randomElement(['Dumbbell', 'Barbell', 'Machine', 'Bodyweight', 'Cable']),
            'difficulty' => $this->faker->randomElement(['beginner', 'intermediate', 'advanced']),
        ];
    }
}
