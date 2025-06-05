<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; 
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany; 

class Equipment extends Model
{
    use HasFactory;

    protected $table = 'equipment'; 
    protected $primaryKey = 'code'; 
    public $incrementing = false; 
    protected $keyType = 'string'; 

    protected $fillable = [
        'code',
        'model',
        'brand',
        'serial',
        'description',
        'status',
        'delete_at',
    ];

    protected $casts = [
        'delete_at' => 'datetime',
    ];


    public function incidences(): HasMany
    {
        return $this->hasMany(Incidence::class, 'equipment_code', 'code'); 
    }

    public function technicalReports(): HasMany
    {
        return $this->hasMany(TechnicalReport::class, 'equipment_id', 'code');
    }
}