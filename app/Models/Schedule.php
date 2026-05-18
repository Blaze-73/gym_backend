<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = [
        'class_name', 
        'day_of_week', 
        'start_time', 
        'end_time', 
        'capacity', 
        'room'
    ];
}
