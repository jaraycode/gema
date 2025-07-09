<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller; 
use App\Models\Equipment; 
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    // ▶ Obtener todos los equipos
    public function index()
    {
        return Equipment::all();
    }

    // ▶ Obtener un equipo específico
    public function show($id)
    {
        return Equipment::findOrFail($id);
    }

    // ▶ Crear equipo (POST)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100',
            'description' => 'nullable|string'
        ]);

        return Equipment::create($validated);
    }

    // ▶ Actualizar equipo (PUT/PATCH)
    public function update(Request $request, $id)
    {
        $equipment = Equipment::findOrFail($id);
        $equipment->update($request->all());
        return $equipment;
    }

    // ▶ Eliminar (soft delete)
    public function destroy($id)
    {
        $equipment = Equipment::findOrFail($id);
        $equipment->delete();
        return response()->json(['message' => 'Equipment eliminado']);
    }
}