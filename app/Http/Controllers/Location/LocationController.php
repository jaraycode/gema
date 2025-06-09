<?php

namespace App\Http\Controllers\Location;

use App\Http\Controllers\Controller;
use App\Http\Requests\Core\Location\StoreLocationRequest;
use App\Http\Requests\Core\Location\UpdateLocationRequest;
use App\Service\Location\LocationService;
use Inertia\Response;
use Inertia\Inertia;

class LocationController extends Controller
{

    public function __construct(protected LocationService $locationService) {}
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $dashboardProps = $this->locationService->getMenu();
        $dashboardProps['data'] = $this->locationService->getAllLocations();
        return Inertia::render(component: 'location/locationIndex', props: $dashboardProps);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return $this->locationService->getLocation(id: intval(value: $id));
    }

    /**
     * Display the form that let's you create a new Location
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLocationRequest $request)
    {
        //
    }

    /**
     * Display the form that let's you edit a Location
     */
    public function edit()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLocationRequest $request, string $id)
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
