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
                'email' => 'jearay.20@est.ucab.edu.ve',
                'username' => 'jearay.20',
                'password' => Hash::make('administrador'),
                'dni' => 'V-29611454',
                'phone_number' => '04121164027',
                'first_name' => 'Jonás',
                'second_name' => 'Enrique',
                'last_name' => 'Aray',
                'second_last_name' => 'Pérez',
                'avatar' => '/avatars/shadcn.jpg',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'email' => 'jortiz.20@est.ucab.edu.ve',
                'username' => 'jortiz.20',
                'password' => Hash::make('administrador'),
                'dni' => 'V-29611454',
                'phone_number' => '04121164027',
                'first_name' => 'Jesús',
                'last_name' => 'Ortiz',
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
        DB::table('personnel_role')->insert(['personnel_id' => 2, 'role_id' => 1]);
    }
}
