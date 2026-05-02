<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class NutritionLog extends Model
{
    protected $fillable = [
        'user_id',
        'log_date',
        'calories',
        'protein_g',
        'carbs_g',
        'fats_g',
        'water_ml',
        'target_calories',
        'target_protein_g',
        'target_carbs_g',
        'target_fats_g',
        'target_water_ml',
    ];

    protected $casts = [
        'log_date' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function meals(): HasMany
    {
        return $this->hasMany(Meal::class);
    }
}
