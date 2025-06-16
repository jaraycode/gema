<?php

namespace App\Http\Controllers\Department;

use App\Http\Controllers\Controller;
use App\Service\Dashboard\DashboardService;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    public function __construct(protected DashboardService $dashboardService) {}

    public function index()
    {
        $currentPath = '/' . Request::path(); // Ej: '/department'
        $dashboardProps = $this->dashboardService->getDataDashboard($currentPath);

        return Inertia::render('department/department', array_merge(
            $dashboardProps,
            [
                // Props adicionales si las necesitas
            ]
        ));
    }

    public function create()
    {
        $currentPath = '/department'; // Establecer el current path a '/department'
        $dashboardProps = $this->dashboardService->getDataDashboard($currentPath);

        return Inertia::render('department/New', array_merge(
            $dashboardProps,
            [
                // Otros props si los necesitas
            ]
        ));
    }
}