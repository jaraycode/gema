<?php

namespace App\Service\Personel;

use App\Models\Personel;
use App\Repository\Core\SidebarRepository;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Pagination\LengthAwarePaginator;
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
    return Personel::where(column: 'delete_at')->paginate(perPage: Personel::count());
  }

  public function getPersonnel(int $id): Builder|Personel
  {
    $personnel = Personel::where(column: 'delete_at')->find($id);

    if (!$personnel) {
      throw new \Exception(message: 'Personal no encontrado');
    }

    return $personnel;
  }

  public function storePersonnel(array $personnel): RedirectResponse
  {
    try {
      $response = Personel::create(attributes: $personnel);
      if ($response) return redirect()->route(route: 'personel.index')->with(key: 'success', value: 'Personal creado exitosamente');
      return redirect()->back()->with(key: 'error', value: 'No se pudo crear el personal. Intente nuevamente!');
    } catch (Exception $e) {
      Log::error(message: 'Creación de Personal ' . $e->getMessage());
      throw new \Exception(message: "Error al guardar Personal: " . $e->getMessage());
    }
  }

  public function updatePersonnel(int $id, array $personnel): RedirectResponse
  {
    try {
      $response = Personel::where(column: 'id', operator: '=', value: $id)->update($personnel);
      if ($response > 0) return redirect()->route(route: 'personel.index')->with(key: 'success', value: 'Personal actualizado exitosamente');
      return redirect()->back()->with(key: 'error', value: 'No se pudo actualizar el Personal. Intente nuevamente!');
    } catch (Exception $e) {
      Log::error(message: 'Actualización de Personal ' . $e->getMessage());
      throw new Exception(message: "Error al actualizar Personal: " . $e->getMessage());
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
