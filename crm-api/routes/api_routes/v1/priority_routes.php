<?php

use App\Http\Controllers\PriorityController;
use Illuminate\Support\Facades\Route;

//** priorities *//
Route::middleware(['auth:sanctum'])->group(function () {
    // Get all priority
    Route::get('/get', [PriorityController::class, 'index']);

    // Create new priority
    Route::post('/create', [PriorityController::class, 'store']);

    // Get single priority
    Route::get('/show/{priority}', [PriorityController::class, 'show']);

    // Update priority
    Route::put('/update/{priority}', [PriorityController::class, 'update']);

    // Delete priority
    Route::delete('/delete/{priority}', [PriorityController::class, 'destroy']);
});
