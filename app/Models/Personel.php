<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Personel extends Model
{

    use HasFactory;
    protected $table = 'personel';
    protected $primaryKey = 'id';
    protected $fillable = [
        "email",
        "username",
        "password",
        "phone_number",
        "first_name",
        "second_name",
        "last_name",
        "second_last_name"
    ];

    public function personel(): BelongsToMany
    {
        return $this->belongsToMany(WorkGroup::class);
    }
}
