<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Exercise extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'image',
        'video_url',
        'muscle_group',
        'equipment',
        'difficulty',
    ];

    public function workouts(): BelongsToMany
    {
        return $this->belongsToMany(Workout::class, 'workout_exercises')
                    ->withPivot('order', 'sets', 'reps', 'duration_seconds', 'rest_seconds', 'notes');
    }
}
