<?php

namespace App\Models;

use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Personel extends Authenticatable
{
    use HasFactory;
    protected $table = 'personel';
    protected $fillable = ['email', 'username', 'password', 'phone_number', 'first_name', 'last_name'];
    protected $primaryKey = 'id';
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
    ];

    public function personel(): BelongsToMany
    {
        return $this->belongsToMany(WorkGroup::class);
    }
}
