<?php

namespace Database\Seeders;

use App\Models\WorkGroup;
use Illuminate\Database\Seeder;

class WorkGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Asegúrate de que 'jonas' exista en la tabla 'personel'
        // y que los TechnicalReport con IDs 1, 2, 3 existan de TechnicalReportSeeder

        WorkGroup::insert([
            // Jonas asignado al reporte técnico 1 (Incidencia AC-001)
            [
                'personel_id' => 1, // ID de Jonas, asumiendo que su ID es 1 (revisa tu DB o PersonelSeeder para el ID correcto)
                'report_id' => 1,   // ID del primer TechnicalReport creado (el de AC-001)
            ],
            // Otro personal (si existe) asignado al reporte técnico 2 (Incidencia AC-002)
            [
                'personel_id' => 1, // Usamos a Jonas de nuevo. Si tienes otro personal, usa su ID.
                'report_id' => 2,   // ID del segundo TechnicalReport creado (el de AC-002)
            ],
            // Asignar a Jonas al reporte técnico 3 (Incidencia AC-003)
            [
                'personel_id' => 1, // ID de Jonas
                'report_id' => 3,   // ID del tercer TechnicalReport
            ],
        ]);
    }
}