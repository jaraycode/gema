<?php

namespace App\Http\Controllers\Equipment;

use App\Http\Controllers\Controller;
use App\Service\Equipment\EquipmentService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EquipmentController extends Controller
{

    public function __construct(protected EquipmentService $equipmentService) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dashboardProps = $this->equipmentService->getMenu();
        $dashboardProps['data'] = $this->equipmentService->getAllEquipments();
        return Inertia::render(component: 'equipment/equipment-index', props: $dashboardProps);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    public function create()
    {
        $dashboardProps = $this->equipmentService->getMenu();
        return Inertia::render(component: 'equipment/equipment-create', props: $dashboardProps);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
