<?php

use App\Http\Controllers\PersonelController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->prefix('personel')->name('personel.')->group(callback: function (): void {
  Route::get(uri: '/', action: [PersonelController::class, 'index'])->name(name: 'index');
  Route::get(uri: '/{id}', action: [PersonelController::class, 'show'])->name(name: 'show');
  Route::get(uri: '/create', action: [PersonelController::class, 'create'])->name(name: 'create');
  Route::post(uri: '/store', action: [PersonelController::class, 'store'])->name(name: 'store');
  Route::get(uri: '/edit/{id}', action: [PersonelController::class, 'index'])->name(name: 'edit');
  Route::put(uri: '/edit/{id}', action: [PersonelController::class, 'index'])->name(name: 'update');
  Route::delete(uri: '/destroy/{id}', action: [PersonelController::class, 'index'])->name(name: 'destroy');
});
