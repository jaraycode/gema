<?php

namespace App\Service\Location;

use App\Models\Location;
use App\Repository\Core\SidebarRepository;
use Exception;
use Illuminate\Database\Eloquent\Builder;
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
        return Location::where(column: 'delete_at')->orderBy(column: 'id')->paginate(perPage: Location::count())->through(callback: function ($value): mixed {
            $value->level = castLevel(index: $value->level - 1);
            return $value;
        });
    }

    public function getLocation(int $id): Builder|Location
    {
        $response = Location::where(column: 'delete_at')->find(id: $id);

        if (!$response) {
            throw new Exception(message: 'Ubicación no encontrada');
        }

        return $response;
    }

    public function storeLocation(array $location): RedirectResponse
    {
        try {
            $response = Location::create(attributes: $location);
            if ($response) return redirect()->route(route: 'location.index')->with(key: 'success', value: 'Ubicación creada exitosamente');
            return redirect()->back()->with(key: 'error', value: 'No se pudo crear la ubicación. Intente nuevamente!');
        } catch (Exception $e) {
            Log::error(message: 'Creación de ubicación ' . $e->getMessage());
            throw new Exception(message: "Error al guardar ubicación: " . $e->getMessage());
        }
    }

    public function updateLocation(array $location, string $id): RedirectResponse
    {
        try {
            $response = Location::where(column: 'id', operator: '=', value: $id)->update($location);
            if ($response > 0) return redirect()->route(route: 'location.index')->with(key: 'success', value: 'Ubicación actualizada exitosamente');
            return redirect()->back()->with(key: 'error', value: 'No se pudo actualizar la ubicación. Intente nuevamente!');
        } catch (Exception $e) {
            Log::error(message: 'Creación de ubicación ' . $e->getMessage());
            throw new Exception(message: "Error al guardar ubicación: " . $e->getMessage());
        }
    }

    public function destroyLocation(string $id): RedirectResponse
    {
        try {
            $response = Location::where(column: 'id', operator: '=', value: $id)->update(['delete_at' => now()]);
            if ($response > 0) return redirect()->route(route: 'location.index')->with(key: 'success', value: 'Ubicación eliminada exitosamente');
            return redirect()->back()->with(key: 'error', value: 'No se pudo eliminar la ubicación. Intente nuevamente!');
        } catch (Exception $e) {
            Log::error(message: 'Creación de ubicación ' . $e->getMessage());
            throw new Exception(message: "Error al guardar ubicación: " . $e->getMessage());
        }
    }
}
