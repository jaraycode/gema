<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Incidence extends Model
{
    use HasFactory;

    protected $table = 'incidence';
    protected $primaryKey = ['code', 'year']; 
    public $incrementing = false; 
    protected $keyType = 'string';

    protected $fillable = [
        'code',
        'year',
        'cause',
        'description',
        'petionier',
        'inspection_guide',
        'status',         
        'resolved_at',    
        'equipment_code', 
    ];

    protected $casts = [
        'year' => 'date',
        'inspection_guide' => 'array', 
        'resolved_at' => 'datetime',
    ];

    protected function setKeysForSaveQuery($query)
    {
        $keys = $this->getKeyName();
        if (!is_array($keys)) {
            return parent::setKeysForSaveQuery($query);
        }

        foreach ($keys as $keyName) {
            $query->where($keyName, '=', $this->getKeyForSaveQuery($keyName));
        }

        return $query;
    }

    protected function getKeyForSaveQuery($keyName = null)
    {
        if (is_null($keyName)) {
            return $this->getKey();
        }
        if ($keyName === 'year' && $this->getAttribute('year') instanceof \DateTime) {
            return $this->getAttribute('year')->format('Y-m-d'); 
        }

        return $this->original[$this->getKeyName()[$keyName]] ?? $this->getAttribute($keyName);
    }

    // Relación con el personal que solicitó la incidencia
    public function petitioner(): BelongsTo
    {
        return $this->belongsTo(Personel::class, 'petionier', 'username');
    }

    // Relación con el equipo
    public function equipment(): BelongsTo
    {
        return $this->belongsTo(Equipment::class, 'equipment_code', 'code');
    }

    // Una incidencia puede tener varios reportes técnicos asociados
    public function technicalReports(): HasMany
    {
        return $this->hasMany(TechnicalReport::class, 'incidence_id', 'code');
    }
}