<?php

namespace App\Models;

use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Personel extends Authenticatable
{
    use HasFactory;
    protected $table = 'personel';
    protected $fillable = ['email', 'username', 'password', 'phone_number', 'first_name', 'second_name', 'last_name', 'second_last_name', 'avatar'];
    protected $primaryKey = 'id';
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'password' => 'hashed',
        'delete_at' => 'datetime',
    ];

    public function personel(): BelongsToMany
    {
        return $this->belongsToMany(WorkGroup::class);
    }
    
    public function departments(): BelongsToMany
    {
        return $this->belongsToMany(Department::class, 'personel_department', 'personel_id', 'department_id')
                    ->withPivot('begin_date', 'end_date');
    }

    public function incidences(): HasMany
    {
        return $this->hasMany(Incidence::class, 'petitioner', 'username');
    }

        public function workGroups(): HasMany
    {
        return $this->hasMany(WorkGroup::class, 'personel_id');
    }
}
