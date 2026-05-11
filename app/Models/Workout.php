<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Workout extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'difficulty',
        'duration_minutes',
        'calories_burned',
        'body_focus',
        'equipment_needed',
        'thumbnail',
        'video_url',
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

    public function exercises(): BelongsToMany
    {
        return $this->belongsToMany(Exercise::class, 'workout_exercises')
                    ->withPivot('order', 'sets', 'reps', 'duration_seconds', 'rest_seconds', 'notes')
                    ->orderByPivot('order');
    }

    public function programs(): BelongsToMany
    {
        return $this->belongsToMany(Program::class, 'program_workouts')
                    ->withPivot('week', 'day', 'order');
    }

    public function userWorkouts(): HasMany
    {
        return $this->hasMany(UserWorkout::class);
    }
}
