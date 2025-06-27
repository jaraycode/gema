<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    protected $table = 'role';
    protected $fillable = ['name'];

    public function personnel(): BelongsToMany
    {
        return $this->belongsToMany(related: Personel::class, table: 'personnel_role', foreignPivotKey: 'personnel_id', relatedPivotKey: 'role_id')->withPivot(columns: ['delete_at'])->where(column: 'delete_at');
    }
}
