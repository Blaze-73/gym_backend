<?php

namespace Database\Seeders;

use App\Models\Meal;
use Illuminate\Database\Seeder;

class MealSeeder extends Seeder
{
    public function run(): void
    {
        // Create 50 meals using factory (each will also create related user and nutrition log)
        Meal::factory()->count(50)->create();
    }
}
