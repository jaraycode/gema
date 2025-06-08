<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Service\Dashboard\DashboardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function __construct(protected DashboardService $dashboardService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $currentPath = $request->path(); // esto da 'dashboard' si usas /dashboard
        if ($currentPath === '/') {
            $currentPath = '/';
        } else {
            $currentPath = '/' . $currentPath;
        }

        $dashboardProps = $this->dashboardService->getDataDashboard($currentPath);

        return Inertia::render('dashboard/dashboard', [
            'user' => $dashboardProps['user'],
            'navMain' => $dashboardProps['navMain'],
            'navSecondary' => $dashboardProps['navSecondary'],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
