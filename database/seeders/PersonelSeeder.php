<?php

namespace Database\Seeders;

use App\Models\Personel;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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
                'password' => Hash::make('yovita12345'),
                'dni' => 'V-29008765',
                'phone_number' => '04121164027',
                'first_name' => 'Jonas',
                'last_name' => 'Aray',
                'avatar' => '/avatars/shadcn.jpg',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);

        Role::create(['name' => 'Jefe']);
        Role::create(['name' => 'Operador']);
        Role::create(['name' => 'Supervisor']);

        DB::table('personel_department')->insert(['personel_id' => 1, 'department_id' => 2]);
        DB::table('personnel_role')->insert(['personnel_id' => 1, 'role_id' => 1]);
    }
}
