<?php

namespace App\Models;

use App\Enums\Location\LocationLevel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;
    use HasFactory;
    protected $table = 'location';
    protected $primaryKey = 'id';
    protected $fillable = ['name', 'code', 'level'];
}
