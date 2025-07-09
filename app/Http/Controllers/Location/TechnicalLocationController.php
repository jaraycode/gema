<?php

namespace App\Http\Controllers\Location;

use App\Http\Controllers\Controller;
use App\Http\Requests\Core\Location\StoreTechnicalLocationRequest;
use App\Http\Requests\Core\Location\UpdateTechnicalLocationRequest;
use App\Models\Location;
use App\Models\TechnicalLocation;
use App\Service\Location\TechnicalLocationService;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class TechnicalLocationController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function __construct(protected TechnicalLocationService $technicalLocationService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $dashboardProps = $this->technicalLocationService->getMenu();
        $data = $this->technicalLocationService->getAllTechnicalLocationCode();
        return Inertia::render(component: 'technical-location/index', props: array_merge($dashboardProps, ['data' => $data]));
    }
    /**
     * Display the form to create a new instance.
     */
    public function create(): Response
    {
        $dashboardProps = $this->technicalLocationService->getMenu();
        $locations = $this->technicalLocationService->getTechnicalLocationGroupByLevel();
        return Inertia::render(component: 'technical-location/create', props: array_merge($dashboardProps, ['data' => $locations->groupBy(groupBy: 'level')->toArray()]));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTechnicalLocationRequest $request): RedirectResponse
    {
        return $this->technicalLocationService->storeTechnicalLocation(technicalLocation: $request->validated());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTechnicalLocationRequest $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return $this->technicalLocationService->softDeleteTechnicalLocation(intval($id));
    }
}
