<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'class_name', 
        'coach_id', 
        'day_of_week', 
        'start_time', 
        'end_time', 
        'capacity', 
        'room'
    ];

    // This is the most important part. 
    // It tells Laravel that 'coach_id' refers to the User model.
    public function coach(): BelongsTo
    {
        return $this->belongsTo(User::class, 'coach_id');
    }
}
