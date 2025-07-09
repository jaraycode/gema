<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Department::insert([
            [
                'name' => 'Grupo de mantenimiento de refrigeración',
                'code' => 'SGMREF',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Grupo de mantenimiento de infraestructura',
                'code' => 'SGMINF',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Grupo de mantenimiento eléctrico',
                'code' => 'SGMELE',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Grupo de mantenimiento de logística',
                'code' => 'SGMLOG',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Grupo de mantenimiento mecánico',
                'code' => 'SGMMÉC',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }
}
