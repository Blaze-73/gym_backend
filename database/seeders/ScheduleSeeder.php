<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Schedule;
use App\Models\User;

class ScheduleSeeder extends Seeder
{
    public function run()
    {
        $coach = User::where('role', 'admin')->first() ?? User::first();

        Schedule::create([
            'class_name' => 'Elite HIIT',
            'coach_id' => $coach->id,
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
            'class_name' => 'Weight loss',
            'coach_id' => $coach->id,
            'day_of_week' => 'Saturday',
            'start_time' => '11:00',
            'end_time' => '12:00',
            'capacity' => 34,
            'room' => 'Studio B'
        ]);
    }
}
