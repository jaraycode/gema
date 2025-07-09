<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WorkGroup extends Model
{
    use HasFactory;

    protected $table = 'work_group';
    protected $primaryKey = ['personel_id', 'report_id'];
    public $incrementing = false; 
    protected $keyType = 'int'; 

    public $timestamps = false;

    protected $fillable = ['personel_id', 'report_id']; 

    // Relación con el personal
    public function personel(): BelongsTo
    {
        return $this->belongsTo(Personel::class, 'personel_id');
    }

    // Relación con el reporte técnico
    public function technicalReport(): BelongsTo
    {
        return $this->belongsTo(TechnicalReport::class, 'report_id');
    }

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

        return $this->original[$this->getKeyName()[$keyName]] ?? $this->getAttribute($keyName);
    }
}