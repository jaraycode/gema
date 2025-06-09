<?php

use App\Http\Controllers\Location\LocationController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('location')->name('location.')->group(callback: function (): void {
    Route::get(uri: '/', action: [LocationController::class, 'index'])->name(name: 'index');
    Route::get(uri: '/create', action: [LocationController::class, 'index'])->name(name: 'create');
    Route::get(uri: '/edit/{id}', action: [LocationController::class, 'index'])->name(name: 'edit');
});
