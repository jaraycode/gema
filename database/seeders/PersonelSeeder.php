<?php

namespace Database\Seeders;

use App\Models\Personel;
use Illuminate\Database\Seeder;

class PersonelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Personel::insert([
            [
                'email' => 'jonas@gmail.com',
                'username' => 'jonas',
                'password' => 'yovita12345',
                'phone_number' => '04121164027',
                'first_name' => 'Jonas',
                'last_name' => 'Aray',
                'avatar' => '/avatars/shadcn.jpg',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
