<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Program extends Model
{
    protected $fillable = [
        'name',
        'description',
        'thumbnail',
        'duration_weeks',
        'days_per_week',
        'difficulty',
        'goal',
        'is_active',
        'coach_id',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function coach(): BelongsTo
    {
        return $this->belongsTo(User::class, 'coach_id');
    }

    public function workouts(): BelongsToMany
    {
        return $this->belongsToMany(Workout::class, 'program_workouts')
                    ->withPivot('week', 'day', 'order');
    }

    public function userPrograms(): HasMany
    {
        return $this->hasMany(UserProgram::class);
    }
}
