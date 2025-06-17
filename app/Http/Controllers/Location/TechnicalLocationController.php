<?php

namespace App\Http\Controllers\Location;

use App\Http\Controllers\Controller;
use App\Http\Requests\Core\Location\StoreLocationRequest;
use App\Http\Requests\Core\Location\UpdateLocationRequest;
use App\Service\Location\TechnicalLocationService;
use Exception;
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
    public function store(Request $request)
    {
        //
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
