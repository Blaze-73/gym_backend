<?php

namespace Database\Factories;

use App\Models\Program;
use App\Models\Coach;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Program> */
class ProgramFactory extends Factory
{
    protected $model = Program::class;

    public function definition()
    {
        return [
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->paragraph,
            'thumbnail' => $this->faker->imageUrl(400, 300, 'fitness'),
            'duration_weeks' => $this->faker->numberBetween(4, 12),
            'days_per_week' => $this->faker->numberBetween(2, 5),
            'difficulty' => $this->faker->randomElement(['beginner', 'intermediate', 'advanced']),
            'goal' => $this->faker->sentence,
            'is_active' => true,
            'coach_id' => Coach::factory(),
        ];
    }
}
