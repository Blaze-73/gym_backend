<?php

namespace Database\Seeders;

use App\Models\Exercise;
use Illuminate\Database\Seeder;

class ExerciseSeeder extends Seeder
{
    public function run(): void
    {
        // Create 30 exercises using factory
        Exercise::factory()->count(30)->create();
    }
}
