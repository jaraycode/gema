<?php

namespace App\Http\Controllers\Location;

use App\Http\Controllers\Controller;
use App\Http\Requests\Core\Location\StoreLocationRequest;
use App\Http\Requests\Core\Location\UpdateLocationRequest;
use App\Service\Location\LocationService;
use Exception;
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
        return Inertia::render(component: 'location/location-index', props: $dashboardProps);
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
        $dashboardProps = $this->locationService->getMenu();
        return Inertia::render(component: 'location/location-create', props: $dashboardProps);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLocationRequest $request): Response
    {
        try {
            $this->locationService->storeLocation(location: $request->toArray());
            $dashboardProps = $this->locationService->getMenu();
            $dashboardProps['response'] = ['message' => 'Ubicación creada exitosamente'];
            return Inertia::render(component: 'location/location-index', props: $dashboardProps);
        } catch (Exception $e) {
            $dashboardProps['errors'] = ['message' => $e->getMessage()];
            return Inertia::render(component: 'location/location-index', props: $dashboardProps);
        }
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
