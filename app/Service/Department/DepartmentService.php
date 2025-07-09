<?php

namespace App\Service\Department;

use App\Models\Department;
use App\Repository\Core\SidebarRepository;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;

class DepartmentService
{

    private string $title = 'Departamento';

    public function __construct(protected SidebarRepository $menu) {}

    public function getMenu(): array
    {
        return setActiveRoute(menu: $this->menu->getSidebarMenu(), title: $this->title);
    }

    public function getAllDepartments(): LengthAwarePaginator
    {
        return Department::where('delete_at')->orderBy('id')->paginate(perPage: Department::count());
    }

    public function storeDepartment(array $request): RedirectResponse
    {
        try {
            $response = Department::create(attributes: $request);
            if ($response) return redirect()->route(route: 'department.index')->with(key: 'success', value: 'Departamento creado exitosamente');
            return redirect()->back()->with(key: 'error', value: 'No se pudo crear el departamento. Intente nuevamente!');
        } catch (Exception $e) {
            return redirect()->back()->with(key: 'error', value: 'No se pudo guardar el departamento: ' . $e->getMessage());
        }
    }

    public function updateDepartment(array $request, int $id): RedirectResponse
    {
        try {
            $response = Department::where(column: 'id', operator: '=', value: $id)->update($request);
            if ($response > 0) return redirect()->route(route: 'department.index')->with(key: 'success', value: 'Departamento actualizado exitosamente');
            return redirect()->back()->with(key: 'error', value: 'No se pudo actualizar el departamento. Intente nuevamente!');
        } catch (Exception $e) {
            Log::error(message: $e->getMessage());
            return redirect()->back()->with(key: 'error', value: 'No se pudo actualizar el departamento: ' . $e->getMessage());
        }
    }

    public function softDeleteDepartment(int $id): RedirectResponse
    {
        try {
            $response = Department::where(column: 'id', operator: '=', value: $id)->update(['delete_at' => now()]);
            if ($response > 0) return redirect()->route(route: 'department.index')->with(key: 'success', value: 'Departamento inhabilitado exitosamente');
            return redirect()->back()->with(key: 'error', value: 'No se pudo inhabilitar el departamento. Intente nuevamente!');
        } catch (Exception $e) {
            Log::error(message: $e->getMessage());
            return redirect()->back()->with(key: 'error', value: 'No se pudo inhabilitar el departamento: ' . $e->getMessage());
        }
    }
}
