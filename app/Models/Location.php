<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;
    protected $table = 'location';
    protected $primaryKey = 'id';
    protected $fillable = ['name', 'code', 'level_min', 'level_max', 'delete_at'];
    protected $casts = [
        'delete_at' => 'datetime',
    ];
}
