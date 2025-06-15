<?php

use App\Http\Controllers\Location\LocationController;
use App\Http\Controllers\Dashboard\DashboardController;
use Illuminate\Support\Facades\Route;



Route::middleware('auth')->get('/', [DashboardController::class, 'index'])->name('home');


require __DIR__ . '/locationRoutes.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/PersonelRoutes.php';
require __DIR__ . '/equipos.php';
