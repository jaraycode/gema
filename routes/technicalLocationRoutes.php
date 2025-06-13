<?php

use App\Http\Controllers\Location\TechnicalLocationController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('technical-location')->name('technical-location.')->group(callback: function (): void {
    Route::get(uri: '/', action: [TechnicalLocationController::class, 'index'])->name(name: 'index');
});
