<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IncidenceController;

Route::prefix('api')->group(function () {
    Route::get('/incidences', [IncidenceController::class, 'index']);
    Route::get('/incidences/{code}/{year}', [IncidenceController::class, 'show']);
    Route::put('/incidences/{code}/{year}', [IncidenceController::class, 'update']);
});