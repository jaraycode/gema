<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $table = 'location';
    protected $primaryKey = 'id';
    protected $fillable = ['name', 'code', 'level_min', 'level_max'];
}
