<?php

use App\Http\Controllers\Equipment\EquipmentController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('equipos')->name('equipment.')->group(callback: function (): void {
    Route::get(uri: '/', action: [EquipmentController::class, 'index'])->name(name: 'index');
    Route::get(uri: '/show/{id}', action: [EquipmentController::class, 'show'])->name(name: 'show');
    Route::get(uri: '/create', action: [EquipmentController::class, 'create'])->name(name: 'create');
    Route::get(uri: '/edit/{id}', action: [EquipmentController::class, 'edit'])->name(name: 'edit');
    Route::put(uri: '/update/{id}', action: [EquipmentController::class, 'update'])->name(name: 'update');
    Route::post(uri: '/store', action: [EquipmentController::class, 'store'])->name(name: 'store');
    Route::delete(uri: '/store/{id}', action: [EquipmentController::class, 'destroy'])->name(name: 'destroy');
});
