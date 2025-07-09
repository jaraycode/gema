<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TechnicalReport extends Model
{
    use HasFactory;

    protected $table = 'technical_report';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'status',
        'resolved_date',
        'equipment_id',
        'incidence_id',
        'incidence_date',
    ];

    protected $casts = [
        'resolved_date' => 'datetime',
        'incidence_date' => 'date',
    ];

    // Relación con el equipo
    public function equipment(): BelongsTo
    {
        return $this->belongsTo(Equipment::class, 'equipment_id', 'code');
    }

    // Relación con la incidencia a la que este reporte técnico está asociado
    public function incidence(): BelongsTo
    {
        return $this->belongsTo(Incidence::class, ['incidence_id', 'incidence_date'], ['code', 'year']);
    }

    // Un reporte técnico puede tener varios miembros en su work_group (a través de la tabla pivot work_group)
    public function workGroups(): HasMany
    {
        return $this->hasMany(WorkGroup::class, 'report_id');
    }
}