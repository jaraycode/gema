<?php

namespace App\Service\Location;

use App\Enums\Location\LocationLevel;
use App\Models\Location;
use App\Models\TechnicalLocation;
use App\Repository\Core\SidebarRepository;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;

class TechnicalLocationService
{
    private string $title = 'Ubicación técnica';

    public function __construct(protected SidebarRepository $menu) {}

    public function getMenu(): array
    {
        return setActiveRoute(menu: $this->menu->getSidebarMenu(), title: $this->title);
    }

    public function getTechnicalLocationGroupByLevel(): Collection
    {
        return Location::all()->map(callback: function (Location $value): Location {
            $value->level = castLevelTechnicalLocation(index: $value->level - 1);
            return $value;
        });
    }

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
