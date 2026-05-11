<?php

namespace Database\Factories;

use App\Models\Meal;
use App\Models\User;
use App\Models\NutritionLog;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Meal> */
class MealFactory extends Factory
{
    protected $model = Meal::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'nutrition_log_id' => NutritionLog::factory(),
            'name' => $this->faker->word,
            'description' => $this->faker->sentence,
            'image' => $this->faker->imageUrl(400, 300, 'food'),
            'meal_type' => $this->faker->randomElement(['breakfast', 'lunch', 'dinner', 'snack']),
            'calories' => $this->faker->numberBetween(100, 800),
            'protein_g' => $this->faker->numberBetween(5, 50),
            'carbs_g' => $this->faker->numberBetween(10, 100),
            'fats_g' => $this->faker->numberBetween(5, 40),
            'eaten_at' => $this->faker->dateTime,
        ];
    }
}
