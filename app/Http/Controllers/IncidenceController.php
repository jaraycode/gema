<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Incidence;
use App\Models\Personel; 
use App\Models\Equipment; 
use App\Models\TechnicalReport;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB; 

class IncidenceController extends Controller
{
    /**
     * Endpoint para obtener todas las incidencias.
     * GET /api/incidences
     */
    public function index()
    {
        $incidences = Incidence::with([
            'petitioner',
            'equipment',
            'technicalReports' => function ($query) {
                $query->with('workGroups.personel'); 
            }
        ])->get();

        return response()->json($incidences);
    }
    /**
     * Endpoint para obtener una incidencia específica.
     * GET /api/incidences/{code}/{year}
     */
    public function show($code, $year)
    {
        $incidencia = Incidence::where('code', $code)->where('year', $year . '-01-01')->first();

        if (!$incidencia) {
            return response()->json(['message' => 'Incidencia no encontrada.'], 404);
        }

        // Cargar relaciones
        $incidencia->load([
            'petitioner',
            'equipment',
            'technicalReports' => function ($query) {
                $query->with('workGroups.personel');
            }
        ]);

        return response()->json($incidencia);
    }

    /**
     * Endpoint para actualizar una incidencia específica.
     * PUT /api/incidences/{code}/{year}
     */
    public function update(Request $request, $code, $year)
    {
        try {
            $incidencia = Incidence::where('code', $code)->where('year', $year . '-01-01')->first();

            if (!$incidencia) {
                return response()->json(['message' => 'Incidencia no encontrada.'], 404);
            }

            $validatedData = $request->validate([
                'cause' => 'sometimes|string',
                'description' => 'sometimes|string',
                'petionier' => 'sometimes|string|exists:personel,username',
                'inspection_guide' => 'nullable|json',
                'status' => ['sometimes', 'string', Rule::in(['pendiente', 'en progreso', 'completado', 'cancelado'])],
                'resolved_at' => 'nullable|date',
                'equipment_code' => 'nullable|string|exists:equipment,code',
            ]);

            // Lógica para sincronizar status y resolved_at
            if (isset($validatedData['resolved_at']) && $validatedData['resolved_at'] !== null) {
                if (!isset($validatedData['status'])) {
                    $validatedData['status'] = 'completado';
                }
            } elseif (isset($validatedData['status']) && $validatedData['status'] !== 'completado') {
                $validatedData['resolved_at'] = null;
            }

            $incidencia->update($validatedData);

            // Cargar relaciones para la respuesta
            $incidencia->load([
                'petitioner',
                'equipment',
                'technicalReports' => function ($query) {
                    $query->with('workGroups.personel');
                }
            ]);

            return response()->json([
                'message' => 'Incidencia actualizada exitosamente.',
                'incidencia' => $incidencia
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación.',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Error updating incidence: ' . $e->getMessage());
            return response()->json([
                'message' => 'Ocurrió un error al actualizar la incidencia.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}