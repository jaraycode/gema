<?php

use App\Http\Controllers\Department\DepartmentController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('departamentos')->name('department.')->group(callback: function (): void {
    Route::get(uri: '/', action: [DepartmentController::class, 'index'])->name(name: 'index');
    Route::get(uri: '/show/{id}', action: [DepartmentController::class, 'show'])->name(name: 'show');
    Route::get(uri: '/create', action: [DepartmentController::class, 'create'])->name(name: 'create');
    Route::post(uri: '/store', action: [DepartmentController::class, 'store'])->name(name: 'store');
    Route::get(uri: '/edit/{id}', action: [DepartmentController::class, 'edit'])->name(name: 'edit');
    Route::put(uri: '/edit/{id}', action: [DepartmentController::class, 'update'])->name(name: 'update');
    Route::delete(uri: '/destroy/{id}', action: [DepartmentController::class, 'destroy'])->name(name: 'destroy');
});
