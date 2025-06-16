<?php

namespace Database\Seeders;

use App\Models\Incidence;
use Illuminate\Database\Seeder;

class IncidenceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Asegúrate de que 'jonas' exista en la tabla personel
        // Asegúrate de que 'AC-001', 'AC-002', 'AC-003' existan en la tabla equipment
        Incidence::insert([
            [
                'code' => 'INC-2025-001',
                'year' => '2025-01-01',
                'cause' => 'Fuga de refrigerante',
                'description' => 'El aire acondicionado de la oficina principal no enfría, se sospecha fuga.',
                'petionier' => 'jonas',
                'inspection_guide' => json_encode(['revisar_tuberias', 'medir_presion_gas']),
                'status' => 'pendiente',
                'resolved_at' => null,
                'equipment_code' => 'AC-001',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'INC-2025-002',
                'year' => '2025-01-01',
                'cause' => 'Filtros sucios',
                'description' => 'El aire acondicionado de la sala de reuniones tiene bajo flujo de aire.',
                'petionier' => 'jonas',
                'inspection_guide' => json_encode(['limpiar_filtros', 'verificar_ventilador']),
                'status' => 'en progreso',
                'resolved_at' => null,
                'equipment_code' => 'AC-002',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // ¡Añadir esta nueva incidencia!
            [
                'code' => 'INC-2025-003',
                'year' => '2025-01-01', // Importante que coincida con la fecha en TechnicalReportSeeder
                'cause' => 'Falla del compresor',
                'description' => 'El compresor del aire acondicionado central no arranca.',
                'petionier' => 'jonas',
                'inspection_guide' => json_encode(['revisar_compresor', 'verificar_electricidad']),
                'status' => 'completado', // Este ya está resuelto en el TR
                'resolved_at' => '2025-06-03 10:30:00', // Coincide con resolved_date del TR
                'equipment_code' => 'AC-003', // Referencia a un AC que ya existe
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}