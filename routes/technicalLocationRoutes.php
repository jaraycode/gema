<?php

use App\Http\Controllers\Location\TechnicalLocationController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('ubicacion-tecnica')->name('technical-location.')->group(callback: function (): void {
    Route::get(uri: '/', action: [TechnicalLocationController::class, 'index'])->name(name: 'index');
    Route::get(uri: '/create', action: [TechnicalLocationController::class, 'create'])->name(name: 'create');
    Route::post(uri: '/create', action: [TechnicalLocationController::class, 'store'])->name(name: 'store');
    Route::delete(uri: '/delete/{id}', action: [TechnicalLocationController::class, 'destroy'])->name(name: 'destroy');
});
