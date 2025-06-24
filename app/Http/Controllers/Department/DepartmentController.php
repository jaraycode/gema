<?php

namespace App\Http\Controllers\Department;

use App\Http\Controllers\Controller;
use App\Http\Requests\Core\Department\StoreDepartmentRequest;
use App\Http\Requests\Core\Department\UpdateDepartmentRequest;
use App\Models\Department;
use App\Service\Department\DepartmentService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Nette\NotImplementedException;

class DepartmentController extends Controller
{
    public function __construct(protected DepartmentService $departmentService) {}

    public function index(): Response
    {
        $dashboardProps = $this->departmentService->getMenu();

        return Inertia::render(component: 'department/department-index', props: array_merge(
            $dashboardProps,
            [
                'data' => $this->departmentService->getAllDepartments()
            ]
        ));
    }

    public function show()
    {
        throw new NotImplementedException();
    }

    public function create(): Response
    {
        $dashboardProps = $this->departmentService->getMenu();

        return Inertia::render(component: 'department/department-create', props: array_merge(
            $dashboardProps,
            [
                // Otros props si los necesitas
            ]
        ));
    }

    public function store(StoreDepartmentRequest $request): RedirectResponse
    {
        return $this->departmentService->storeDepartment(request: $request->validated());
    }

    public function edit(string $id): Response
    {
        $dashboardProps = $this->departmentService->getMenu();
        $department = Department::find(id: $id);

        return Inertia::render(component: 'department/department-edit', props: array_merge(
            $dashboardProps,
            [
                'department' => $department
            ]
        ));
    }

    public function update(UpdateDepartmentRequest $request, string $id): RedirectResponse
    {
        return $this->departmentService->updateDepartment(request: $request->validated(), id: intval(value: $id));
    }

    public function destroy(string $id): RedirectResponse
    {
        return $this->departmentService->updateDepartment(request: ['delete_at' => now()], id: intval(value: $id));
    }
}
