<?php

namespace Database\Seeders;

use App\Models\Coach;
use Illuminate\Database\Seeder;

class CoachSeeder extends Seeder
{
    public function run(): void
    {
        // Create 10 coaches using factory
        Coach::factory()->count(10)->create();
    }
}
