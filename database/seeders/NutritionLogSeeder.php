<?php

namespace Database\Seeders;

use App\Models\NutritionLog;
use Illuminate\Database\Seeder;

class NutritionLogSeeder extends Seeder
{
    public function run(): void
    {
        // Create 30 nutrition logs (each will also create a user via factory)
        NutritionLog::factory()->count(30)->create();
    }
}
