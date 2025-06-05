<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Location::insert(values: [
            [
                'name' => 'Módulo 2',
                'code' => 'M2',
                'level_min' => 1,
                'level_max' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Planta baja',
                'code' => 'PB',
                'level_min' => 2,
                'level_max' => 2,
                'created_at' => now(),
                'updated_at' => now()
            ],
            // [
            //     'name' => '',
            //     'code' => '',
            //     'level_min' => 1,
            //     'level_max' => 1,
            //     'created_at' => now(),
            //     'updated_at' => now()
            // ],
            // [
            //     'name' => '',
            //     'code' => '',
            //     'level_min' => 1,
            //     'level_max' => 1,
            //     'created_at' => now(),
            //     'updated_at' => now()
            // ],
            // [
            //     'name' => '',
            //     'code' => '',
            //     'level_min' => 1,
            //     'level_max' => 1,
            //     'created_at' => now(),
            //     'updated_at' => now()
            // ],
            // [
            //     'name' => '',
            //     'code' => '',
            //     'level_min' => 1,
            //     'level_max' => 1,
            //     'created_at' => now(),
            //     'updated_at' => now()
            // ],
            // [
            //     'name' => '',
            //     'code' => '',
            //     'level_min' => 1,
            //     'level_max' => 1,
            //     'created_at' => now(),
            //     'updated_at' => now()
            // ],
            // [
            //     'name' => '',
            //     'code' => '',
            //     'level_min' => 1,
            //     'level_max' => 1,
            //     'created_at' => now(),
            //     'updated_at' => now()
            // ],
        ]);
    }
}
