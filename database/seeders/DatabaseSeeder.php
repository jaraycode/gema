<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(class: [
            DepartmentSeeder::class,
            LocationSeeder::class,
            PersonelSeeder::class,
            EquipmentSeeder::class,
            IncidenceSeeder::class,
            TechnicalReportSeeder::class, 
            WorkGroupSeeder::class,      
        ]);
    }
}