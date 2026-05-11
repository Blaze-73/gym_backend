<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Meal extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nutrition_log_id',
        'name',
        'description',
        'image',
        'meal_type',
        'calories',
        'protein_g',
        'carbs_g',
        'fats_g',
        'eaten_at',
    ];

    protected $casts = [
        'eaten_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function nutritionLog(): BelongsTo
    {
        return $this->belongsTo(NutritionLog::class);
    }
}
