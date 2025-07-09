<?php

namespace App\Service\Equipment;

use App\Contracts\Correlative;
use App\Models\Equipment;
use App\Models\TechnicalLocation;
use App\Repository\Core\SidebarRepository;
use App\Service\Util\CorrelativeEquipment;
use Exception;
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
        return Equipment::where('delete_at')->paginate(perPage: Equipment::count())->through(callback: function ($value): mixed {
            $value->status = castEquipmentStatus(index: $value->status);
            return $value;
        });
    }

    public function getEquipmentById(string $id): Equipment|null
    {
        return Equipment::find(id: $id);
    }

    public function getEquipmentType(): array
    {
        return ['Refrigeración', 'Logística', 'Infraestructura', 'Mecánico', 'Eléctrico'];
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
            $correlative = $this->correlativeService->getCorrelative(equipment: $code[0]);
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

    /**
     * A partir del código único del equipo se actualizan los campos. Se genera un caso de error en caso que no encuentre al equipo según su código primario.
     * @param array $request
     * @param string $id
     * @throws \Exception
     * @return RedirectResponse
     */
    public function updateEquipment(array $request, string $id): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $response = Equipment::where(column: 'code', operator: '=', value: $id)->update($request);

            if ($response > 0) {
                DB::commit();
                return redirect()->route(route: 'equipment.index')->with(key: 'success', value: 'Equipo actualizado exitosamente');
            }

            throw new Exception(message: 'Error al actualizar el equipo');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->with(key: 'error', value: $e->getMessage());
        }
    }

    /**
     * Toma la clave primaria del equipo para actualizar el campo 'delete_at' para inhabilitar el registro y que no pueda aparecer en otros campos.
     * @param string $id
     * @throws \Exception
     * @return RedirectResponse
     */
    public function softDeleteEquipment(string $id): RedirectResponse
    {
        DB::beginTransaction();
        try {
            $response = Equipment::where(column: 'code', operator: '=', value: $id)->update(['delete_at' => now()]);

            if ($response > 0) {
                DB::commit();
                return redirect()->route(route: 'equipment.index')->with(key: 'success', value: 'Equipo inhabilitado exitosamente');
            }

            throw new Exception(message: 'Error al inhabilitar el equipo');
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->with(key: 'error', value: $e->getMessage());
        }
    }

    /**
     * Toma la clave foranea de ubicación técnica del equipo para actualizar el campo 'delete_at' para inhabilitar el registro y que no pueda aparecer en otros campos.
     * @param string $id
     * @throws \Exception
     */
    public function softDeleteEquipmentByTechnicalLocation(array $ids)
    {
        try {
            foreach ($ids as $id) {
                Equipment::where(column: 'technical_location', operator: '=', value: $id)->update(['delete_at' => now()]);
            }
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception(message: 'Desde equipos: ' . $e->getMessage());
        }
    }
}
