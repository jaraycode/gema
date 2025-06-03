<?php

use App\Http\Controllers\PersonelController;
use Illuminate\Support\Facades\Route;


Route::apiResource("personels", PersonelController::class);

