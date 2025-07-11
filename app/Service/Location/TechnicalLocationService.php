<?php

namespace App\Service\Location;

use App\Enums\Location\LocationLevel;
use App\Models\Location;
use App\Models\TechnicalLocation;
use App\Repository\Core\SidebarRepository;
use App\Service\Equipment\EquipmentService;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TechnicalLocationService
{
    private string $title = 'Ubicación técnica';

    public function __construct(protected SidebarRepository $menu, protected EquipmentService $equipmentService) {}

    /**
     * Función base para poder renderizar el sidebar.
     * @return array
     */
    public function getMenu(): array
    {
        return setActiveRoute(menu: $this->menu->getSidebarMenu(), title: $this->title);
    }

    /**
     * Regresa todas las ubicaciones con su respectivo nivel en formato json para que sea más sencillo de manipular al momento de crear una ubicación técnica.
     * @return Collection<int, Location>|\Illuminate\Support\Collection<int, Location>
     */
    public function getTechnicalLocationGroupByLevel(): Collection
    {
        return Location::where('delete_at')->get()->map(callback: function (Location $value): Location {
            $value->level = castLevelTechnicalLocation(index: $value->level - 1);
            return $value;
        });
    }

    /**
     * Envia la información necesaria para la página principal de ubicación técnica, donde se necesita el identificador de la ubicación técnica y la combinación de los códigos de cada ubicación con paginación.
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getAllTechnicalLocationCode(): LengthAwarePaginator
    {
        $technicalLocations = TechnicalLocation::where('delete_at')->paginate(perPage: TechnicalLocation::count(), columns: ['id', 'level1', 'level2', 'level3', 'level4', 'level5', 'level6', 'level7'])->through(callback: function ($value): array {
            $valueArray = $value->toArray();
            $id = $valueArray['id'];
            unset($valueArray['id']);
            return ['id' => $id, 'code' => getCodeTechnicalLocation(levels: $valueArray)];
        });
        return $technicalLocations;
    }

    /**
     * Envia la información necesaria para la página de creación de equipos, donde se necesita el identificador de la ubicación técnica y la combinación de los códigos de cada ubicación sin paginar.
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllTechnicalLocationCodeNotPaginated(): Collection
    {
        $technicalLocations = TechnicalLocation::where('delete_at')->get(columns: ['id', 'level1', 'level2', 'level3', 'level4', 'level5', 'level6', 'level7'])->map(callback: function ($value): array {
            $valueArray = $value->toArray();
            $id = $valueArray['id'];
            unset($valueArray['id']);
            return ['id' => $id, 'code' => getCodeTechnicalLocation(levels: $valueArray)];
        });
        return $technicalLocations;
    }

    /**
     * Se crea un nuevo registro de ubicación técnica, siendo este las referencias directas del ID de la tabla de ubicaciones (location), antes de guardar el registro verifica que siga la regla que nos indica que el último de la cadena tiene que ser un equipo.
     * @param array $technicalLocation
     * @throws \Exception
     * @return RedirectResponse
     */
    public function storeTechnicalLocation(array $technicalLocation): RedirectResponse
    {
        try {
            $reversedTechnicalLocation = array_reverse(array: $technicalLocation);
            foreach ($reversedTechnicalLocation as $reverse) {
                if ($reverse) {
                    $level = Location::where('delete_at')->where(column: 'id', operator: '=', value: $reverse)->value('level');
                    if ($level != LocationLevel::EQUIPMENT->value) {
                        throw new Exception(message: 'La ubicación no puede tener como último nivel un área');
                    } else {
                        break;
                    }
                }
            }
            $response = TechnicalLocation::create(attributes: $technicalLocation);
            if ($response) return redirect()->route(route: 'technical-location.index')->with(key: 'success', value: 'Ubicación técnica creada exitosamente');
            throw new Exception(message: 'No se pudo crear la ubicación técnica. Intente nuevamente!');
        } catch (Exception $e) {
            Log::error(message: 'Creación de ubicación técnica ' . $e->getMessage());
            return redirect()->back()->with(key: 'error', value: $e->getMessage());
        }
    }

    /**
     * Función encargada de inhabilitar una ubicación técnica basándose en la ubicación que está siendo inhabilitada, posteriormente sigue en la cadena con los equipos.
     * @param int $id
     * @param array $level
     * @throws \Exception
     * @return void
     */
    public function softDeleteTechnicalLocationByLocation(int $id, array $level = [1])
    {
        try {
            foreach ($level as $l) {
                $level = match ($l) {
                    1 => 'level1',
                    2 => 'level2',
                    3 => 'level3',
                    4 => 'level4',
                    5 => 'level5',
                    6 => 'level6',
                    7 => 'level7',
                };
                $technical_location = TechnicalLocation::where(column: $level, operator: '=', value: $id)->get('id');
                if (!empty($technical_location)) $this->equipmentService->softDeleteEquipmentByTechnicalLocation(ids: $technical_location->toArray());
                TechnicalLocation::where(column: $level, operator: '=', value: $id)->update(['delete_at' => now()]);
            }
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception('Desde Ubicación técnica: ' . $e->getMessage());
        }
    }

    public function softDeleteTechnicalLocation(int $id): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $technical_location = TechnicalLocation::where(column: 'id', operator: '=', value: $id)->get('id');
            if (!empty($technical_location)) $this->equipmentService->softDeleteEquipmentByTechnicalLocation(ids: $technical_location->toArray());
            $response = TechnicalLocation::where(column: 'id', operator: '=', value: $id)->update(['delete_at' => now()]);
            if ($response > 0) {
                DB::commit();
                return redirect()->route(route: 'technical-location.index')->with(key: 'success', value: 'Ubicación técnica inhabilitada exitosamente');
            }
            throw new Exception('No he sido posible inhabilitar registro');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->with(key: 'error', value: 'Desde Ubicación técnica: ' . $e->getMessage());
        }
    }
}
