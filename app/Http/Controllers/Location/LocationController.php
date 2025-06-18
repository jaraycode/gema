<?php

namespace App\Http\Controllers\Location;

use App\Http\Controllers\Controller;
use App\Http\Requests\Core\Location\StoreLocationRequest;
use App\Http\Requests\Core\Location\UpdateLocationRequest;
use App\Service\Location\LocationService;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
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
        return Inertia::render(component: 'location/location-index', props: array_merge($dashboardProps, ['data' => $this->locationService->getAllLocations()]));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $response = $this->locationService->getLocation(id: intval(value: $id));
            return $response;
        } catch (Exception $e) {
            return redirect()->back()->with(key: 'error', value: $e->getMessage());
        }
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
    public function store(StoreLocationRequest $request): RedirectResponse
    {
        return $this->locationService->storeLocation(location: $request->validated());
    }

    /**
     * Display the form that let's you edit a Location
     */
    public function edit(string $id): RedirectResponse|Response
    {
        try {
            $location = $this->locationService->getLocation(id: intval(value: $id));
            $dashboardProps = $this->locationService->getMenu();
            return Inertia::render(component: 'location/location-edit', props: array_merge($dashboardProps, ['data' => $location]));
        } catch (Exception $e) {
            return redirect()->back()->with(key: 'error', value: $e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLocationRequest $request, string $id)
    {
        return $this->locationService->updateLocation(location: $request->toArray(), id: $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
