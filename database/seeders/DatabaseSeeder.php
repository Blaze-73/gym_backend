<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Call all seeders, including newly added ones for demo data
        $this->call([
            AdminSeeder::class,
            CategorySeeder::class,
            PlanSeeder::class,
            ProductSeeder::class,
            CoachSeeder::class,
            ExerciseSeeder::class,
            WorkoutSeeder::class,
            ProgramSeeder::class,
            MealSeeder::class,
            NutritionLogSeeder::class,
        ]);
    }
}
