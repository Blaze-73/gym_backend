<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Schedule;
use App\Models\Coach;
use Illuminate\Support\Facades\DB;

class ScheduleResetSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Wipe ONLY the schedules table
        // This prevents the 500 error by removing the corrupted "User ID" data
        DB::table('schedules')->truncate();

        // 2. Get a valid Coach ID (NOT a User ID)
        $coach = Coach::first();

        if (!$coach) {
            $this->command->error("No coaches found in the coaches table! Please run CoachSeeder first.");
            return;
        }

        // 3. Create clean, correct data
        Schedule::create([
            'class_name' => 'Elite HIIT',
            'coach_id' => $coach->id, // Correct Coach ID
            'day_of_week' => 'Monday',
            'start_time' => '13:00',
            'end_time' => '14:00',
            'capacity' => 20,
            'room' => 'Studio A'
        ]);

        Schedule::create([
            'class_name' => 'Power Lifting',
            'coach_id' => $coach->id,
            'day_of_week' => 'Wednesday',
            'start_time' => '16:00',
            'end_time' => '18:00',
            'capacity' => 10,
            'room' => 'Heavy Zone'
        ]);

        Schedule::create([
            'class_name' => 'Weight Loss',
            'coach_id' => $coach->id,
            'day_of_week' => 'Saturday',
            'start_time' => '11:00',
            'end_time' => '12:00',
            'capacity' => 34,
            'room' => 'Studio B'
        ]);

        $this->command->info("✅ Schedules table reset and re-seeded successfully!");
    }
}
