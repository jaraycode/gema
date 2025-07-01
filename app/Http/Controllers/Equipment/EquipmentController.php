<?php

namespace App\Http\Controllers\Equipment;

use App\Http\Controllers\Controller;
use App\Http\Requests\Core\Equipment\StoreEquipmentRequest;
use App\Service\Equipment\EquipmentService;
use App\Service\Location\TechnicalLocationService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EquipmentController extends Controller
{

    public function __construct(protected EquipmentService $equipmentService, protected TechnicalLocationService $technicalLocationService) {}

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
        $locations = $this->technicalLocationService->getTechnicalLocationGroupByLevel();
        $locations = $locations->groupBy(groupBy: 'level')->toArray();
        return Inertia::render(component: 'equipment/equipment-create', props: array_merge($dashboardProps, ['equipment_type' => $this->equipmentService->getEquipmentType(), 'locations' => $locations, 'technical_locations' => $this->technicalLocationService->getAllTechnicalLocationCodeNotPaginated()]));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEquipmentRequest $request)
    {
        return $this->equipmentService->storeEquipment($request->validated());
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
