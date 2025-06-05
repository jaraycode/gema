<?php

namespace Database\Seeders;

use App\Models\TechnicalReport;
use Illuminate\Database\Seeder;

class TechnicalReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Asegúrate de que las incidencias 'INC-2025-001' y 'INC-2025-002' existan del IncidenceSeeder
        // y los equipos 'AC-001' y 'AC-002' del EquipmentSeeder

        TechnicalReport::insert([
            [
                'status' => 'revisado',
                'resolved_date' => null, // Aún no resuelto
                'equipment_id' => 'AC-001', // ID del aire acondicionado de la primera incidencia
                'incidence_id' => 'INC-2025-001', // Código de la primera incidencia
                'incidence_date' => '2025-01-01', // Fecha de la primera incidencia (formato YYYY-MM-DD)
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'status' => 'en reparacion',
                'resolved_date' => null, // Aún no resuelto
                'equipment_id' => 'AC-002', // ID del aire acondicionado de la segunda incidencia
                'incidence_id' => 'INC-2025-002', // Código de la segunda incidencia
                'incidence_date' => '2025-01-01', // Fecha de la segunda incidencia
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'status' => 'resuelto',
                'resolved_date' => '2025-06-03 10:30:00', // Ejemplo de fecha resuelta (usando la fecha actual)
                'equipment_id' => 'AC-003', // Un AC que tal vez no tenía una incidencia directa, o para una incidencia resuelta
                'incidence_id' => 'INC-2025-003', // Asumimos que esta incidencia ya existe o se creará
                'incidence_date' => '2025-01-01',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}