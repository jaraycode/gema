<?php

use App\Http\Controllers\PersonelController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->prefix('personal')->name('personel.')->group(callback: function (): void {
  Route::get(uri: '/', action: [PersonelController::class, 'index'])->name(name: 'index');
  Route::get(uri: '/profile/{id}', action: [PersonelController::class, 'show'])->name(name: 'show');
  Route::get(uri: '/create', action: [PersonelController::class, 'create'])->name(name: 'create');
  Route::post(uri: '/store', action: [PersonelController::class, 'store'])->name(name: 'store');
  Route::get('/edit/{id}', [PersonelController::class, 'edit'])->name('edit');
  Route::put('/update/{id}', [PersonelController::class, 'update'])->name('update');
  Route::delete(uri: '/destroy/{id}', action: [PersonelController::class, 'index'])->name(name: 'destroy');
});
