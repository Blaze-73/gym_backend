<?php

namespace Database\Factories;

use App\Models\Workout;
use App\Models\Coach;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Workout> */
class WorkoutFactory extends Factory
{
    protected $model = Workout::class;

    public function definition()
    {
        return [
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->sentence,
            'difficulty' => $this->faker->randomElement(['beginner', 'intermediate', 'advanced']),
            'duration_minutes' => $this->faker->numberBetween(20, 90),
            'calories_burned' => $this->faker->numberBetween(200, 800),
            'body_focus' => $this->faker->randomElement(['Full Body', 'Upper', 'Lower']),
            'equipment_needed' => $this->faker->randomElement(['Dumbbells', 'Barbell', 'None', 'Machine']),
            'thumbnail' => $this->faker->imageUrl(400, 300, 'fitness'),
            'video_url' => $this->faker->url,
            'is_active' => true,
            'coach_id' => Coach::factory(),
        ];
    }
}
