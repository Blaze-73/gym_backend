<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $fillable = [
        'name',
        'price',
        'duration',
        'features',
        'popular',
        'savings'
    ];

public function membership(){
    return $this->hasMany(Membership::class);
}

public function memberships(){
    return $this->hasMany(Membership::class);
}
}
