<?php

namespace App\Models;

use Illuminate\Support\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class TechnicalLocation extends Model
{
    protected $table = 'technical_location';

    protected $fillable = ['level1', 'level2', 'level3', 'level4'];
}
