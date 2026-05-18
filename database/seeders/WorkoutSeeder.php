<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Workout;
use App\Models\Exercise;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class WorkoutSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Workout::truncate();
        DB::table('workout_exercises')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $admin = User::where('role', 'admin')->first();

        $workoutPlans = [
            ['name' => 'Apex Strength', 'focus' => 'Chest & Back', 'diff' => 'advanced', 'exercises' => [1, 2, 6, 7, 8, 11]],
            ['name' => 'Hypertrophy Hour', 'focus' => 'Full Body', 'diff' => 'intermediate', 'exercises' => [1, 11, 16, 21, 26, 10]],
            ['name' => 'Lower Body Burn', 'focus' => 'Legs', 'diff' => 'intermediate', 'exercises' => [11, 12, 13, 14, 15]],
            ['name' => 'Neural Reset', 'focus' => 'Shoulders & Core', 'diff' => 'beginner', 'exercises' => [16, 17, 18, 26, 27]],
            ['name' => 'Upper Body Blitz', 'focus' => 'Arms & Chest', 'diff' => 'intermediate', 'exercises' => [1, 3, 21, 22, 23, 24]],
            ['name' => 'V-Taper Protocol', 'focus' => 'Back & Shoulders', 'diff' => 'advanced', 'exercises' => [7, 8, 9, 16, 19]],
            ['name' => 'Core Stability', 'focus' => 'Abs', 'diff' => 'beginner', 'exercises' => [26, 27, 28, 29, 30]],
            ['name' => 'Iron Will', 'focus' => 'Full Body Power', 'diff' => 'advanced', 'exercises' => [6, 11, 16, 21, 1, 7]],
            ['name' => 'Quick Burn', 'focus' => 'Cardio/Core', 'diff' => 'beginner', 'exercises' => [30, 29, 4, 14]],
        ];

        foreach ($workoutPlans as $plan) {
            $workout = Workout::create([
                'name' => $plan['name'],
                'description' => "Elite {$plan['focus']} training protocol.",
                'difficulty' => $plan['diff'],
                'duration_minutes' => rand(45, 90),
                'calories_burned' => rand(400, 800),
                'body_focus' => $plan['focus'],
                'coach_id' => $admin->id,
                'is_active' => true,
                'thumbnail' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
            ]);

            // Link exercises to the workout in the pivot table
            foreach ($plan['exercises'] as $index => $exerciseId) {
                $workout->exercises()->attach($exerciseId, [
                    'order' => $index + 1,
                    'sets' => rand(3, 5),
                    'reps' => rand(8, 15),
                    'rest_seconds' => 60,
                ]);
            }
        }
    }
}
