<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Coach;
use Illuminate\Support\Facades\DB;

class CoachSeeder extends Seeder
{
    public function run(): void
    {
        // Wipe only the coaches table
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Coach::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $coachesData = [
            [
                'name' => 'Marcus Thorne',
                'specialization' => 'Hypertrophy & Strength',
                'bio' => 'Former Olympian specializing in biological recalibration and muscle density optimization.',
                'certifications' => 'CSCS, NASM-PES, Precision Nutrition L2',
                'experience_years' => 12,
                'rating' => 4.9,
                'avatar' => 'https://images.unsplash.com/photo-1567013353852-30277b58270c?auto=format&fit=crop&w=400&q=80',
                'expertise_areas' => ['Powerlifting', 'Muscle Growth', 'Metabolic Conditioning'],
                'is_available' => true,
            ],
            [
                'name' => 'Sienna Vance',
                'specialization' => 'Mobility & Athleticism',
                'bio' => 'Expert in biomechanics and flow-state training. Dedicated to erasing physical limitations.',
                'certifications' => 'NSCA-CPT, Yoga Alliance RYT-500',
                'experience_years' => 8,
                'rating' => 4.8,
                'avatar' => 'https://images.unsplash.com/photo-1594382261501-a30356272612?auto=format&fit=crop&w=400&q=80',
                'expertise_areas' => ['Flexibility', 'Agility', 'Post-Injury Recovery'],
                'is_available' => true,
            ],
            [
                'name' => 'Kaelen Drax',
                'specialization' => 'Endurance & Bio-Hacking',
                'bio' => 'Specialist in aerobic capacity and nutrient timing. Optimization is the only path.',
                'certifications' => 'ACSM-CEP, Precision Nutrition L1',
                'experience_years' => 10,
                'rating' => 4.7,
                'avatar' => 'https://images.unsplash.com/photo-1434681896a96-b8dD-S-S-S', // Use any direct link
                'expertise_areas' => ['Marathon Training', 'VO2 Max Optimization', 'Ketogenic Coaching'],
                'is_available' => true,
            ],
        ];

        foreach ($coachesData as $data) {
            Coach::create($data);
        }
    }
}
