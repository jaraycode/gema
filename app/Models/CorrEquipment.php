<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CorrEquipment extends Model
{
    protected $table = 'correlative_equipment';
    protected $fillable = ['code', 'counter'];
    protected $primaryKey = 'id';
}
