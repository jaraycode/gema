<?php

namespace App\Http\Controllers\Equipment;

use App\Http\Controllers\Controller;
use App\Http\Requests\Core\Equipment\StoreEquipmentRequest;
use App\Http\Requests\Core\Equipment\UpdateEquipmentRequest;
use App\Service\Equipment\EquipmentService;
use App\Service\Location\TechnicalLocationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Nette\NotImplementedException;

class EquipmentController extends Controller
{

    public function __construct(protected EquipmentService $equipmentService, protected TechnicalLocationService $technicalLocationService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
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
        throw new NotImplementedException();
    }

    public function create(): Response
    {
        $dashboardProps = $this->equipmentService->getMenu();
        $locations = $this->technicalLocationService->getTechnicalLocationGroupByLevel();
        $locations = $locations->groupBy(groupBy: 'level')->toArray();
        return Inertia::render(component: 'equipment/equipment-create', props: array_merge($dashboardProps, ['equipment_type' => $this->equipmentService->getEquipmentType(), 'locations' => $locations, 'technical_locations' => $this->technicalLocationService->getAllTechnicalLocationCodeNotPaginated()]));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEquipmentRequest $request): RedirectResponse
    {
        return $this->equipmentService->storeEquipment($request->validated());
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): RedirectResponse|Response
    {
        $dashboardProps = $this->equipmentService->getMenu();
        $locations = $this->technicalLocationService->getTechnicalLocationGroupByLevel();
        $locations = $locations->groupBy(groupBy: 'level')->toArray();
        $data = $this->equipmentService->getEquipmentById(id: $id);

        if (empty($data)) {
            return redirect()->back()->with(key: 'error', value: 'El equipo no ha sido encontrado.');
        }

        return Inertia::render(component: 'equipment/equipment-edit', props: array_merge($dashboardProps, ['equipment_type' => $this->equipmentService->getEquipmentType(), 'locations' => $locations, 'technical_locations' => $this->technicalLocationService->getAllTechnicalLocationCodeNotPaginated(), 'props' => $data]));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEquipmentRequest $request, string $id): RedirectResponse
    {
        return $this->equipmentService->updateEquipment(request: $request->validated(), id: $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        return $this->equipmentService->softDeleteEquipment(id: $id);
    }
}
