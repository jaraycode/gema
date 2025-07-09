<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CorrIncidence extends Model
{
    protected $table = 'correlative_incidence';
    protected $fillable = ['year', 'code', 'counter'];
    protected $primaryKey = ['year', 'code'];
    public $incrementing = false;
}
