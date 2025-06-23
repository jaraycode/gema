<?php

use App\Http\Controllers\Dashboard\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->get('/', [DashboardController::class, 'index'])->name('home');

require __DIR__ . '/DepartmentRoutes.php';
require __DIR__ . '/LocationRoutes.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/PersonelRoutes.php';
require __DIR__ . '/equipmentRoutes.php';
require __DIR__ . '/technicalLocationRoutes.php';
require __DIR__ . '/IncidencesRoutes.php';
