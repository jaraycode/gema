<?php

namespace App\Service\Personel;


use App\Models\Personel;
use App\Repository\Core\SidebarRepository;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use PhpParser\Builder;

class PersonelService
{

  private string $title = 'Personal';

  public function __construct(protected SidebarRepository $menu) {}

  public function getMenu(): array
  {
    return setActiveRoute(menu: $this->menu->getSidebarMenu(), title: $this->title);
  }

  public function getAllPersonnel(): LengthAwarePaginator
  {
    $paginatedData = Personel::with(relations: 'departments')->where(column: 'delete_at')->paginate(perPage: Personel::count());
    return $paginatedData->through(function ($value) {
      $valueArray = $value->toArray();
      $valueArray['departments'] = $valueArray['departments'][0]['code'];
      return $valueArray;
    });
  }

  public function getPersonnel(int $id): Builder|Personel
  {
    $personnel = Personel::with(relations: "departments")->where(column: 'delete_at')->find($id);

    if (!$personnel) {
      throw new Exception(message: 'Personal no encontrado');
    }

    return $personnel;
  }

  public function storePersonnel(array $personnel): RedirectResponse
  {
    DB::beginTransaction();
    try {
      $personnel['password'] = Hash::make(value: $personnel['password']);
      $personnel['username'] = explode(separator: '@', string: $personnel['email'])[0];
      $personnel['dni'] = $personnel['national_status'] . '-' . $personnel['dni'];
      $names = explode(separator: ' ', string: $personnel['name']);
      $personnel['first_name'] = $names[0];
      $personnel['second_name'] = $names[1] ?? null;
      $names = explode(separator: ' ', string: $personnel['last_name']);
      $personnel['last_name'] = $names[0];
      $personnel['second_last_name'] = $names[1] ?? null;
      $personnel['avatar'] = '/avatars/shadcn.jpg';
      unset($personnel['name']);
      unset($personnel['national_status']);
      $response = Personel::create(attributes: $personnel);

      if (!$response) throw new Exception('No se pudo guardar el personal');

      $response->departments()->sync([
        $personnel['department'] => [
          "begin_date" => now()->setTimezone('GMT-4')->format('Y-m-d H:i:s'),
          "end_date" => null,
        ]
      ], false);

      DB::commit();
      return redirect()->route(route: 'personel.index')->with(key: 'success', value: 'Personal creado exitosamente');
    } catch (Exception $e) {
      DB::rollBack();
      Log::error(message: 'Creación de Personal ' . $e->getMessage());
      return redirect()->back()->with(key: 'error', value: 'Error al guardar Personal: ' . $e->getMessage());
    }
  }

  public function updatePersonnel(int $id, array $personnel): RedirectResponse
  {
    DB::beginTransaction();
    try {
      $newDepartmentId = $personnel['department'];
      unset($personnel['department']);
      $personnelRecord = Personel::findOrFail($id);
      $personnelRecord->update($personnel);
      $currentDepartment = $personnelRecord->departments()
        ->wherePivot('end_date', null)
        ->first();
      if ($currentDepartment) {
        $personnelRecord->departments()->updateExistingPivot($currentDepartment->id, [
          'end_date' => now()->setTimezone('GMT-4')->format('Y-m-d H:i:s')
        ]);
      }
      $personnelRecord->departments()->sync([
        $newDepartmentId => [
          "begin_date" => now()->setTimezone('GMT-4')->format('Y-m-d H:i:s'),
          "end_date" => null,
        ]
      ], false);
      // $personnelRecord->departments()->sync($newDepartmentId, [
      //   'begin_date' => now()->setTimezone('GMT-4')->format('Y-m-d H:i:s'),
      //   'end_date' => null
      // ]);

      DB::commit();
      return redirect()->route('personel.index')->with('success', 'Personal actualizado exitosamente');
    } catch (Exception $e) {
      DB::rollBack();
      Log::error('Actualización de Personal ' . $e->getMessage());
      return redirect()->back()->with('error', 'No se pudo actualizar el Personal. Intente nuevamente!');
    }
  }

  public function deletePersonnel(int $id): RedirectResponse
  {
    try {
      $response = Personel::where(column: 'id', operator: '=', value: $id)->update(['delete_at' => now()]);
      if ($response > 0) return redirect()->route(route: 'personel.index')->with(key: 'success', value: 'Personel eliminado exitosamente');
      return redirect()->back()->with(key: 'error', value: 'No se pudo eliminar el Personal. Intente nuevamente!');
    } catch (Exception $e) {
      Log::error(message: 'Borrado de Personal ' . $e->getMessage());
      throw new Exception(message: "Error al borrar Personal: " . $e->getMessage());
    }
  }
}
