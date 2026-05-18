<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Exercise;
use Illuminate\Support\Facades\DB;

class ExerciseSeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Exercise::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $exercises = [
            // CHEST
            ['name' => 'Bench Press', 'muscle_group' => 'Chest', 'difficulty' => 'intermediate', 'equipment' => 'Barbell', 'image' => 'https://images.unsplash.com/photo-1571019613655-3a6H-S-S-S'], // I'll use a generic gym image for those missing
            ['name' => 'Dumbbell Press', 'muscle_group' => 'Chest', 'difficulty' => 'intermediate', 'equipment' => 'Dumbbells', 'image' => 'https://images.unsplash.com/photo-1534275934151-3342308901a1?auto=format&fit=crop&w=800&q=80'],
            ['name' => 'Chest Flys', 'muscle_group' => 'Chest', 'difficulty' => 'beginner', 'equipment' => 'Cables', 'image' => 'https://images.unsplash.com/photo-1541534736199-a9757bf2ef12?auto=format&fit=crop&w=800&q=80'],
            ['name' => 'Pushups', 'muscle_group' => 'Chest', 'difficulty' => 'beginner', 'equipment' => 'Bodyweight', 'image' => 'https://images.unsplash.com/photo-1571019614242-e7edcd79563a?auto=format&fit=crop&w=800&q=80'],
            ['name' => 'Dips', 'muscle_group' => 'Chest', 'difficulty' => 'intermediate', 'equipment' => 'Parallel Bars', 'image' => 'https://images.unsplash.com/photo-1598S-S-S'], 

            // BACK
            ['name' => 'Deadlift', 'muscle_group' => 'Back', 'difficulty' => 'advanced', 'equipment' => 'Barbell', 'image' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'],
            ['name' => 'Pull Ups', 'muscle_group' => 'Back', 'difficulty' => 'intermediate', 'equipment' => 'Pull-up Bar', 'image' => 'https://images.unsplash.com/photo-1598S-S-S'],
            ['name' => 'Bent Over Row', 'muscle_group' => 'Back', 'difficulty' => 'intermediate', 'equipment' => 'Barbell', 'image' => 'https://images.unsplash.com/photo-1526402966543-7d23646621b3?auto=format&fit=crop&w=800&q=80'],
            ['name' => 'Lat Pulldown', 'muscle_group' => 'Back', 'difficulty' => 'beginner', 'equipment' => 'Machine', 'image' => 'https://images.unsplash.com/photo-1591S-S-S'],
            ['name' => 'Single Arm Row', 'muscle_group' => 'Back', 'difficulty' => 'beginner', 'equipment' => 'Dumbbells', 'image' => 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'],

            // LEGS
            ['name' => 'Squats', 'muscle_group' => 'Legs', 'difficulty' => 'intermediate', 'equipment' => 'Barbell', 'image' => 'https://images.unsplash.com/photo-1534258524067-87637bb7578d?auto=format&fit=crop&w=800&q=80'],
            ['name' => 'Leg Press', 'muscle_group' => 'Legs', 'difficulty' => 'beginner', 'equipment' => 'Machine', 'image' => 'https://images.unsplash.com/photo-1591343391010-76a6bc8b643e?auto=format&fit=crop&w=800&q=80'],
            ['name' => 'Lunges', 'muscle_group' => 'Legs', 'difficulty' => 'beginner', 'equipment' => 'Dumbbells', 'image' => 'https://images.unsplash.com/photo-1434681896a96-b8dD-S-S-S'],
            ['name' => 'Leg Extensions', 'muscle_group' => 'Legs', 'difficulty' => 'beginner', 'equipment' => 'Machine', 'image' => 'https://images.unsplash.com/photo-1571019613655-3a6H-S-S-S'],
            ['name' => 'Hamstring Curls', 'muscle_group' => 'Legs', 'difficulty' => 'beginner', 'equipment' => 'Machine', 'image' => 'https://images.unsplash.com/photo-1591343391010-76a6bc8b643e?auto=format&fit=crop&w=800&q=80'],

            // SHOULDERS
            ['name' => 'Overhead Press', 'muscle_group' => 'Shoulders', 'difficulty' => 'intermediate', 'equipment' => 'Barbell', 'image' => 'https://images.unsplash.com/photo-1532303822767-5ecb7557370d?auto=format&fit=crop&w=800&q=80'],
            ['name' => 'Lateral Raises', 'muscle_group' => 'Shoulders', 'difficulty' => 'beginner', 'equipment' => 'Dumbbells', 'image' => 'https://images.unsplash.com/photo-1541534736199-a9757bf2ef12?auto=format&fit=crop&w=800&q=80'],
            ['name' => 'Front Raises', 'muscle_group' => 'Shoulders', 'difficulty' => 'beginner', 'equipment' => 'Dumbbells', 'image' => 'https://images.unsplash.com/photo-1571019613655-3a6H-S-S-S'],
            ['name' => 'Face Pulls', 'muscle_group' => 'Shoulders', 'difficulty' => 'intermediate', 'equipment' => 'Cables', 'image' => 'https://images.unsplash.com/photo-1591S-S-S'],
            ['name' => 'Arnold Press', 'muscle_group' => 'Shoulders', 'difficulty' => 'advanced', 'equipment' => 'Dumbbells', 'image' => 'https://images.unsplash.com/photo-153436S-S-S'],

            // ARMS
            ['name' => 'Bicep Curls', 'muscle_group' => 'Arms', 'difficulty' => 'beginner', 'equipment' => 'Dumbbells', 'image' => 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61S-S-S'],
            ['name' => 'Hammer Curls', 'muscle_group' => 'Arms', 'difficulty' => 'beginner', 'equipment' => 'Dumbbells', 'image' => 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61S-S-S'],
            ['name' => 'Tricep Pushdowns', 'muscle_group' => 'Arms', 'difficulty' => 'beginner', 'equipment' => 'Cables', 'image' => 'https://images.unsplash.com/photo-1571019613655-3a6H-S-S-S'],
            ['name' => 'Skull Crushers', 'muscle_group' => 'Arms', 'difficulty' => 'intermediate', 'equipment' => 'Barbell', 'image' => 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80'],
            ['name' => 'Preacher Curls', 'muscle_group' => 'Arms', 'difficulty' => 'intermediate', 'equipment' => 'EZ Bar', 'image' => 'https://images.unsplash.com/photo-1591S-S-S'],

            // CORE
            ['name' => 'Plank', 'muscle_group' => 'Core', 'difficulty' => 'beginner', 'equipment' => 'Bodyweight', 'image' => 'https://images.unsplash.com/photo-1544005613-13f17aee242d?auto=format&fit=crop&w=800&q=80'],
            ['name' => 'Hanging Leg Raises', 'muscle_group' => 'Core', 'difficulty' => 'advanced', 'equipment' => 'Pull-up Bar', 'image' => 'https://images.unsplash.com/photo-1571019613655-3a6H-S-S-S'],
            ['name' => 'Russian Twists', 'muscle_group' => 'Core', 'difficulty' => 'beginner', 'equipment' => 'Dumbbells', 'image' => 'https://images.unsplash.com/photo-1544005613-13f17aee242d?auto=format&fit=crop&w=800&q=80'],
            ['name' => 'Crunches', 'muscle_group' => 'Core', 'difficulty' => 'beginner', 'equipment' => 'Bodyweight', 'image' => 'https://images.unsplash.com/photo-1544005613-13f17aee242d?auto=format&fit=crop&w=800&q=80'],
            ['name' => 'Mountain Climbers', 'muscle_group' => 'Core', 'difficulty' => 'intermediate', 'equipment' => 'Bodyweight', 'image' => 'https://images.unsplash.com/photo-1544005613-13f17aee242d?auto=format&fit=crop&w=800&q=80'],
        ];

        foreach ($exercises as $ex) {
            Exercise::create($ex);
        }
    }
}
