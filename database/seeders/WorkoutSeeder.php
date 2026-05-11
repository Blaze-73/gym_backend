<?php

namespace Database\Seeders;

use App\Models\Workout;
use App\Models\Exercise;
use Illuminate\Database\Seeder;

class WorkoutSeeder extends Seeder
{
    public function run(): void
    {
        // Create 15 workouts
        Workout::factory()->count(15)->create()->each(function (Workout $workout) {
            // Attach 5 random exercises to each workout with pivot data
            $exercises = Exercise::inRandomOrder()->limit(5)->get();
            foreach ($exercises as $index => $exercise) {
                $workout->exercises()->attach($exercise->id, [
                    'order' => $index + 1,
                    'sets' => rand(3, 5),
                    'reps' => rand(8, 15),
                    'duration_seconds' => null,
                    'rest_seconds' => 60,
                    'notes' => null,
                ]);
            }
        });
    }
}
