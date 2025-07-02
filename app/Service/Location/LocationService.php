<?php

namespace App\Service\Location;

use App\Enums\Location\LocationLevel;
use App\Models\Location;
use App\Repository\Core\SidebarRepository;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class LocationService
{
    private string $title = 'Ubicación';

    public function __construct(protected SidebarRepository $menu, protected TechnicalLocationService $technicalLocationService) {}

    /**
     * Función base para poder renderizar el sidebar.
     * @return array
     */
    public function getMenu(): array
    {
        return setActiveRoute(menu: $this->menu->getSidebarMenu(), title: $this->title);
    }

    /**
     * Función ideada para las pantallas principales donde se necesita todas las ubicaciones con paginación, se filtran por las que estén activas y ordenadas según su id, posteriormente se hace casting del nivel de base numérica a string.
     * @return LengthAwarePaginator
     */
    public function getAllLocations(): LengthAwarePaginator
    {
        return Location::where(column: 'delete_at')->orderBy(column: 'id')->paginate(perPage: Location::count())->through(callback: function ($value): mixed {
            $value->level = castLevel(index: $value->level - 1);
            return $value;
        });
    }

    /**
     * Busca ubicación específica según su identificador, en caso de no encontrar regresa una excepción.
     * @param int $id
     * @throws \Exception
     * @return Builder<Location>|Location
     */
    public function getLocation(int $id): Builder|Location
    {
        $response = Location::where(column: 'delete_at')->find(id: $id);

        if (!$response) {
            throw new Exception(message: 'Ubicación no encontrada');
        }

        return $response;
    }

    /**
     * Pasado un arreglo con estructura similar al modelo de ubicación se guarda el nuevo registro.
     * @param array $location
     * @throws \Exception
     * @return RedirectResponse
     */
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
    /**
     * Pasado un arreglo con estructura similar al modelo de ubicación se actualiza el registro según su identificador.
     * @param array $location
     * @param string $id
     * @throws \Exception
     * @return RedirectResponse
     */
    public function updateLocation(array $location, string $id): RedirectResponse
    {
        try {
            $response = Location::where(column: 'id', operator: '=', value: $id)->update($location);
            if ($response > 0) return redirect()->route(route: 'location.index')->with(key: 'success', value: 'Ubicación actualizada exitosamente');
            return redirect()->back()->with(key: 'error', value: 'No se pudo actualizar la ubicación. Intente nuevamente!');
        } catch (Exception $e) {
            Log::error(message: 'Creación de ubicación ' . $e->getMessage());
            throw new Exception(message: "Error al actualizar ubicación: " . $e->getMessage());
        }
    }

    /**
     * Se busca desactivar la ubicación al asignarle valor al campo de delete_at según el id que se pase. Además se sigue una cadena que permite inhabilitar los registros que estén relacionados con esta ubicación.
     * @param string $id
     * @throws \Exception
     * @return RedirectResponse
     */
    public function destroyLocation(string $id): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $location = Location::findOrFail(id: $id)->toArray();
            match ($location['level']) {
                LocationLevel::MODULE->value => $this->technicalLocationService->softDeleteTechnicalLocationByLocation(id: $id),
                LocationLevel::FLOOR->value => $this->technicalLocationService->softDeleteTechnicalLocationByLocation(id: $id, level: [2]),
                LocationLevel::OFFICE->value => $this->technicalLocationService->softDeleteTechnicalLocationByLocation(id: $id, level: [3, 4, 5, 6]),
                LocationLevel::EQUIPMENT->value => $this->technicalLocationService->softDeleteTechnicalLocationByLocation(id: $id, level: [4, 5, 6, 7]),
            };
            $response = Location::where(column: 'id', operator: '=', value: $id)->update(['delete_at' => now()]);
            if ($response > 0) {
                DB::commit();
                return redirect()->route(route: 'location.index')->with(key: 'success', value: 'Ubicación inhabilitada exitosamente');
            }
            return redirect()->back()->with(key: 'error', value: 'No se pudo inhabilitada la ubicación. Intente nuevamente!');
        } catch (Exception $e) {
            DB::rollBack();
            Log::error(message: 'Creación de ubicación ' . $e->getMessage());
            throw new Exception(message: "Error al inhabilitada ubicación: " . $e->getMessage());
        }
    }
}
