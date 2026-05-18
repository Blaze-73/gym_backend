<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Program;
use App\Models\Workout;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ProgramSeeder extends Seeder
{
    public function run(): void
    {
        // Only wipe programs and their links, keep everything else (Users, Exercises, etc.)
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Program::truncate();
        DB::table('program_workouts')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $admin = User::where('role', 'admin')->first();
        $allWorkouts = Workout::all();

        if ($allWorkouts->isEmpty()) {
            $this->command->error("No workouts found! Please run php artisan db:seed --class=WorkoutSeeder first.");
            return;
        }

        /**
         * MAPPING LOGIC:
         * Index 0: Apex Strength (Chest/Back)
         * Index 1: Hypertrophy Hour (Full Body)
         * Index 2: Lower Body Burn (Legs)
         * Index 3: Neural Reset (Shoulders/Core)
         * Index 4: Upper Body Blitz (Arms/Chest)
         * Index 5: V-Taper Protocol (Back/Shoulders)
         * Index 6: Core Stability (Abs)
         * Index 7: Iron Will (Full Body Power)
         * Index 8: Quick Burn (Cardio/Core)
         */
        $programs = [
            [
                'name' => 'FULL BODY FOUNDATION',
                'description' => 'A comprehensive entry-level program designed to build a balanced base of strength and stability.',
                'duration_weeks' => 8,
                'days_per_week' => 3,
                'difficulty' => 'beginner',
                'goal' => 'General Fitness',
                'thumbnail' => 'https://images.unsplash.com/photo-1517836357463-d251f1904C-S-S-S', 
                'workout_indices' => [1, 6, 8] // Full Body, Core, Quick Burn
            ],
            [
                'name' => 'LOWER BODY SPECIALIST',
                'description' => 'Advanced protocols focusing on quad development, hamstring power, and glute hypertrophy.',
                'duration_weeks' => 10,
                'days_per_week' => 3,
                'difficulty' => 'intermediate',
                'goal' => 'Leg Growth',
                'thumbnail' => 'https://images.unsplash.com/photo-1534258524067-87637bb7578d?q=80&w=800',
                'workout_indices' => [2, 7, 1] // Lower Body Burn, Iron Will, Hypertrophy
            ],
            [
                'name' => 'UPPER BODY POWER',
                'description' => 'Focused on maximizing pushing and pulling strength for a powerful V-taper physique.',
                'duration_weeks' => 12,
                'days_per_week' => 4,
                'difficulty' => 'advanced',
                'goal' => 'Upper Body Strength',
                'thumbnail' => 'https://images.unsplash.com/photo-158100914S-S-S',
                'workout_indices' => [0, 4, 5] // Apex Strength, Upper Body Blitz, V-Taper
            ],
            [
                'name' => 'CORE & CONDITIONING',
                'description' => 'High-intensity metabolic conditioning paired with deep core stabilization techniques.',
                'duration_weeks' => 6,
                'days_per_week' => 5,
                'difficulty' => 'intermediate',
                'goal' => 'Athleticism',
                'thumbnail' => 'https://images.unsplash.com/photo-1544005613-13f17aee242d?q=80&w=800',
                'workout_indices' => [3, 6, 8] // Neural Reset, Core Stability, Quick Burn
            ],
            [
                'name' => 'ELITE ATHLETE PERFORMANCE',
                'description' => 'The pinnacle of training. Combining heavy compound lifts with high-volume accessory work.',
                'duration_weeks' => 16,
                'days_per_week' => 6,
                'difficulty' => 'advanced',
                'goal' => 'Peak Performance',
                'thumbnail' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
                'workout_indices' => [0, 1, 2, 5, 7] // Strength, Hypertrophy, Legs, V-Taper, Iron Will
            ],
        ];

        foreach ($programs as $pData) {
            $program = Program::create([
                'name' => $pData['name'],
                'description' => $pData['description'],
                'duration_weeks' => $pData['duration_weeks'],
                'days_per_week' => $pData['days_per_week'],
                'difficulty' => $pData['difficulty'],
                'goal' => $pData['goal'],
                'thumbnail' => $pData['thumbnail'],
                'coach_id' => $admin->id,
                'is_active' => true,
            ]);

            foreach ($pData['workout_indices'] as $index => $workoutIdx) {
                if (isset($allWorkouts[$workoutIdx])) {
                    $workout = $allWorkouts[$workoutIdx];
                    
                    // Distribute across the first 2 weeks for the demo
                    $program->workouts()->attach($workout->id, [
                        'week' => ($index < 3) ? 1 : 2, 
                        'day' => ($index % 7) + 1, 
                        'order' => $index + 1
                    ]);
                }
            }
        }
    }
}
