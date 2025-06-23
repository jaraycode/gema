<?php

namespace App\Http\Controllers\Department;

use App\Http\Controllers\Controller;
use App\Http\Requests\Core\Department\StoreDepartmentRequest;
use App\Service\Department\DepartmentService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class DepartmentController extends Controller
{
    public function __construct(protected DepartmentService $departmentService) {}

    public function index(): Response
    {
        $dashboardProps = $this->departmentService->getMenu();

        return Inertia::render('department/department-index', array_merge(
            $dashboardProps,
            [
                'data' => $this->departmentService->getAllDepartments()
            ]
        ));
    }

    public function create(): Response
    {
        $dashboardProps = $this->departmentService->getMenu();

        return Inertia::render('department/department-create', array_merge(
            $dashboardProps,
            [
                // Otros props si los necesitas
            ]
        ));
    }

    public function store(StoreDepartmentRequest $request): RedirectResponse
    {
        return $this->departmentService->storeDepartment($request->validated());
    }

    public function edit(): Response
    {
        $dashboardProps = $this->departmentService->getMenu();

        return Inertia::render('department/department-edit', array_merge(
            $dashboardProps,
            [
                // Otros props si los necesitas
            ]
        ));
    }
}
