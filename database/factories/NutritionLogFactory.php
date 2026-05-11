<?php

namespace Database\Factories;

use App\Models\NutritionLog;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<NutritionLog> */
class NutritionLogFactory extends Factory
{
    protected $model = NutritionLog::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'log_date' => $this->faker->date(),
            'calories' => $this->faker->numberBetween(1500, 3000),
            'protein_g' => $this->faker->numberBetween(50, 200),
            'carbs_g' => $this->faker->numberBetween(150, 400),
            'fats_g' => $this->faker->numberBetween(40, 100),
            'water_ml' => $this->faker->numberBetween(1500, 3500),
            'target_calories' => 2500,
            'target_protein_g' => 150,
            'target_carbs_g' => 250,
            'target_fats_g' => 70,
            'target_water_ml' => 3000,
        ];
    }
}
