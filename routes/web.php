<?php

use App\Http\Controllers\Dashboard\DashboardController;
use Illuminate\Support\Facades\Route;

Route::get('/', [DashboardController::class, 'index'])->name('home');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
