<?php

namespace App\Http\Controllers\Location;

use App\Http\Controllers\Controller;
use App\Http\Requests\Core\Location\StoreTechnicalLocationRequest;
use App\Http\Requests\Core\Location\UpdateTechnicalLocationRequest;
use App\Service\Location\TechnicalLocationService;
use Exception;
use Illuminate\Http\RedirectResponse;
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
        return Inertia::render(component: 'technical-location/index', props: $dashboardProps);
    }

    public function create()
    {
        $dashboardProps = $this->technicalLocationService->getMenu();
        return Inertia::render(component: 'technical-location/create', props: $dashboardProps);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTechnicalLocationRequest $request): RedirectResponse
    {
        dd($request);
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
        //
    }
}
