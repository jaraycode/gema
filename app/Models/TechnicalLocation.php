<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TechnicalLocation extends Model
{
    protected $table = 'technical_location';

    protected $fillable = ['level1', 'level2', 'level3', 'level4'];
}
