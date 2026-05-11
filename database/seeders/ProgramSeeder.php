<?php

namespace Database\Seeders;

use App\Models\Program;
use App\Models\Workout;
use Illuminate\Database\Seeder;

class ProgramSeeder extends Seeder
{
    public function run(): void
    {
        // Create 8 programs and attach workouts
        Program::factory()->count(8)->create()->each(function (Program $program) {
            $workouts = Workout::inRandomOrder()->limit(3)->get();
            foreach ($workouts as $index => $workout) {
                $program->workouts()->attach($workout->id, [
                    'week' => rand(1, $program->duration_weeks),
                    'day' => rand(1, $program->days_per_week),
                    'order' => $index + 1,
                ]);
            }
        });
    }
}
