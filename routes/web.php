<?php

use App\Http\Controllers\Location\LocationController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Department\DepartmentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->get('/', [DashboardController::class, 'index'])->name('home');
Route::middleware('auth')->get('/department', [DepartmentController::class, 'index'])->name('department.index');
Route::middleware('auth')->get('/department/new', [DepartmentController::class, 'create'])->name('department.new');

require __DIR__ . '/locationRoutes.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/PersonelRoutes.php';
