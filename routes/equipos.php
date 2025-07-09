<?php

use App\Http\Controllers\Settings\EquipmentController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('equipos')->name('equipos.')->group(function () {
    Route::get('/', [EquipmentController::class, 'index'])->name('index');
    Route::get('/create', [EquipmentController::class, 'create'])->name('create');
    Route::post('/store', [EquipmentController::class, 'store'])->name('store');
    Route::get('/edit/{id}', [EquipmentController::class, 'show'])->name('edit');
    Route::put('/update/{id}', [EquipmentController::class, 'update'])->name('update');
    Route::delete('/destroy/{id}', [EquipmentController::class, 'destroy'])->name('destroy');
});