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
  public function index()
  {
    $dashboardProps = $this->dashboardService->getMenu();
    $kpis = $this->dashboardService->getKpis();
    return Inertia::render('dashboard/dashboard', array_merge($dashboardProps, ['kpis' => $kpis]));
  }

  /**
   * Get all the kpis for the dashboard
   */

  public function getAllKpis() {
      return $this->dashboardService->getKpis();
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
