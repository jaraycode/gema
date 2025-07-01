<?php

use App\Http\Controllers\Equipment\EquipmentController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('equipment')->name('equipment.')->group(callback: function (): void {
    Route::get(uri: '/', action: [EquipmentController::class, 'index'])->name(name: 'index');
    Route::get(uri: '/create', action: [EquipmentController::class, 'create'])->name(name: 'create');
    Route::get(uri: '/edit/{id}', action: [EquipmentController::class, 'index'])->name(name: 'edit');
    Route::post(uri: '/store', action: [EquipmentController::class, 'store'])->name(name: 'store');
});
