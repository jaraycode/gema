<?php

use App\Http\Controllers\Location\LocationController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->prefix('location')->group(callback: function (): void {
    Route::get(uri: '/', action: [LocationController::class, 'index'])->name(name: 'location.index');
    Route::get(uri: '/create', action: [LocationController::class, 'index'])->name(name: 'location.create');
    Route::get(uri: '/edit/{id}', action: [LocationController::class, 'index'])->name(name: 'location.edit');
});
