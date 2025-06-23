<?php

namespace App\Service\Department;

use App\Models\Department;
use App\Repository\Core\SidebarRepository;
use Exception;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\RedirectResponse;

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
        return Department::paginate(perPage: Department::count());
    }

    public function storeDepartment(array $request): RedirectResponse
    {
        try {
            $response = Department::create($request);
            if ($response) return redirect()->route(route: 'department.index')->with(key: 'success', value: 'Departamento creado exitosamente');
            return redirect()->back()->with(key: 'error', value: 'No se pudo crear el departamento. Intente nuevamente!');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'No se pudo guardar el departamento: ' . $e->getMessage());
        }
    }
}
