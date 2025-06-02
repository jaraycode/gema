<?php

namespace App\Models;

use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Personel extends Authenticatable
{
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

    /**
     * Checks into the database if the email along with the password exists inside the database, if the user does not exists returns true otherwise returns false.
     * @param string $username
     * @param string $password
     * @return bool
     */
    public static function authenticateWithEmail(string $email, string $password): bool
    {
        $response = self::where(column: 'email', operator: '=', value: $email)->where(column: 'password', operator: '=', value: Hash::make(value: $password))->first();
        return !empty($response);
    }

    /**
     * Checks into the database if the username along with the password exists inside the database, if the user does not exists returns true otherwise returns false.
     * @param string $username
     * @param string $password
     * @return bool
     */
    public static function authenticateWithUsername(string $username, string $password): bool
    {
        $response = self::where(column: 'username', operator: '=', value: $username)->where(column: 'password', operator: '=', value: Hash::make(value: $password))->first();
        return !empty($response);
    }
}
