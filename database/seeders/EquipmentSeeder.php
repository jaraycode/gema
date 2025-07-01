<?php

namespace Database\Seeders;

use App\Models\Equipment;
use Illuminate\Database\Seeder;

class EquipmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Equipment::insert([
            [
                'code' => 'AC-001',
                'model' => 'Split Inverter 12000 BTU',
                'brand' => 'Samsung',
                'serial' => 'SAM-SPLIT-12K-ABC',
                'description' => 'Aire acondicionado de oficina principal. Módulo 2.',
                'technical_location' => 1,
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'AC-002',
                'model' => 'Ventana 24000 BTU',
                'brand' => 'LG',
                'serial' => 'LG-VENT-24K-XYZ',
                'description' => 'Aire acondicionado de la sala de reuniones. Planta Baja.',
                'technical_location' => 1,
                'status' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'AC-003',
                'model' => 'Central de 5 Toneladas',
                'brand' => 'Carrier',
                'serial' => 'CAR-CENT-5T-112233',
                'description' => 'Unidad de aire central del Data Center.',
                'technical_location' => 1,
                'status' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
