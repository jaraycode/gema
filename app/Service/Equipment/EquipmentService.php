<?php

namespace App\Service\Equipment;

use App\Contracts\Correlative;
use App\Enums\Location\LocationLevel;
use App\Models\Equipment;
use App\Models\Location;
use App\Models\TechnicalLocation;
use App\Repository\Core\SidebarRepository;
use App\Service\Util\CorrelativeEquipment;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class EquipmentService
{
    private string $title = 'Equipo';
    private Correlative $correlativeService;

    public function __construct(protected SidebarRepository $menu)
    {
        $this->correlativeService = new CorrelativeEquipment();
    }

    public function getMenu(): array
    {
        return setActiveRoute(menu: $this->menu->getSidebarMenu(), title: $this->title);
    }

    public function getAllEquipments(): LengthAwarePaginator
    {
        return Equipment::paginate(perPage: Equipment::count())->through(callback: function ($value): mixed {
            $value->status = castEquipmentStatus(index: $value->status);
            return $value;
        });
    }

    public function getEquipmentById(string $id): Equipment|null
    {
        return Equipment::find(id: $id);
    }

    public function getEquipmentType(): Collection
    {
        return Location::where('delete_at')->where('level', '=', LocationLevel::EQUIPMENT->value)->get(['name', 'code']);
    }

    public function storeEquipment(array $request): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $technicalLocations = TechnicalLocation::where('delete_at')->where(column: 'id', operator: '=', value: $request['technical_location'])->get(columns: ['id', 'level1', 'level2', 'level3', 'level4', 'level5', 'level6', 'level7'])->map(callback: function (TechnicalLocation $value): array {
                $valueArray = $value->toArray();
                $id = $valueArray['id'];
                unset($valueArray['id']);
                return ['id' => $id, 'code' => getCodeTechnicalLocation(levels: $valueArray)];
            });

            if (empty($technicalLocations)) throw new Exception(message: 'Ubicación técnica no existe o ha sido deshabilitada');

            $technicalLocations = $technicalLocations->toArray()[0];

            $code = explode(separator: '-', string: $technicalLocations['code']);
            $code = array_reverse($code);

            if ($code[0] !== $request['type']) throw new Exception(message: 'El tipo de equipo tiene que coincidir con la ubicación técnica');

            $correlative = $this->correlativeService->getCorrelative(equipment: $request['type']);

            $request['code'] = $technicalLocations['code'] . '-' . $correlative;
            $request['technical_location'] = intval(value: $request['technical_location']);

            $response = Equipment::create(attributes: $request);

            if ($response) {
                DB::commit();
                return redirect()->route(route: 'equipment.index')->with(key: 'success', value: 'Equipo creado exitosamente');
            }

            throw new Exception(message: 'Error al guardar');
        } catch (Exception $e) {
            DB::rollBack();
            dd($e);
            return redirect()->back()->with(key: 'error', value: $e->getMessage());
        }
    }
}
