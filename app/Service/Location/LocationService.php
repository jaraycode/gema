<?php

namespace App\Service\Location;

use App\Models\Location;
use App\Repository\Core\SidebarRepository;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Log;

class LocationService
{
    private string $title = 'Ubicación';

    public function __construct(protected SidebarRepository $menu) {}

    public function getMenu(): array
    {
        return setActiveRoute(menu: $this->menu->getSidebarMenu(), title: $this->title);
    }

    public function getAllLocations(): LengthAwarePaginator
    {
        return Location::paginate(perPage: Location::count())->through(callback: function ($value): mixed {
            $value->level = castLevel(index: $value->level - 1);
            return $value;
        });
    }

    public function getLocation(int $id): Collection
    {
        return Location::find(id: $id)->get();
    }

    public function storeLocation(array $location): RedirectResponse
    {
        try {
            $location = Location::create(attributes: $location);
            if ($location) return redirect()->route(route: 'location.index')->with(key: 'success', value: 'Ubicación creada exitosamente');
            return redirect()->back()->with(key: 'error', value: 'No se pudo crear la ubicación. Intente nuevamente!');
        } catch (Exception $e) {
            Log::error(message: 'Creación de ubicación ' . $e->getMessage());
            throw new Exception(message: "Error al guardar ubicación: " . $e->getMessage());
        }
    }
}
