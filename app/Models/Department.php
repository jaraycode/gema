<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Department extends Model
{
    use HasFactory;

    protected $table = 'department';
    protected $primaryKey = 'id';
    protected $fillable = ['name', 'code', 'delete_at'];
    protected $casts = [
        'delete_at' => 'datetime',
    ];

    public function personnels(): BelongsToMany
    {
        return $this->belongsToMany(Personel::class, 'personel_department', 'department_id', 'personel_id')->withPivot('begin_date', 'end_date');
    }
}
