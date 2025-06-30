<?php

namespace App\Service\Location;

use App\Enums\Location\LocationLevel;
use App\Models\Location;
use App\Models\TechnicalLocation;
use App\Repository\Core\SidebarRepository;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;

class TechnicalLocationService
{
    private string $title = 'Ubicación técnica';

    public function __construct(protected SidebarRepository $menu) {}

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
        return Location::all()->map(callback: function (Location $value): Location {
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
        $technicalLocations = TechnicalLocation::paginate(perPage: TechnicalLocation::count(), columns: ['id', 'level1', 'level2', 'level3', 'level4', 'level5', 'level6', 'level7'])->through(callback: function ($value): array {
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
                        return redirect()->back()->with(key: 'error', value: "La ubicación no puede tener como último nivel un área");
                    } else {
                        break;
                    }
                }
            }
            $response = TechnicalLocation::create(attributes: $technicalLocation);
            if ($response) return redirect()->route(route: 'technical-location.index')->with(key: 'success', value: 'Ubicación técnica creada exitosamente');
            return redirect()->back()->with(key: 'error', value: 'No se pudo crear la ubicación técnica. Intente nuevamente!');
        } catch (Exception $e) {
            Log::error(message: 'Creación de ubicación ' . $e->getMessage());
            throw new Exception(message: "Error al guardar ubicación: " . $e->getMessage());
        }
    }
}
