<?php

use App\Http\Controllers\StatusController;
use Illuminate\Support\Facades\Route;

//** Statues *//
Route::middleware(['auth:sanctum'])->group(function () {
    // Get all status
    Route::get('/get', [StatusController::class, 'index']);
    // Get single status
    Route::get('/show/{status}', [StatusController::class, 'show']);
    // Create new status
    Route::post('/create', [StatusController::class, 'store']);
    // Update status
    Route::put('/update/{status}', [StatusController::class, 'update']);
    // Delete status
    Route::delete('/delete/{status}', [StatusController::class, 'destroy']);
});
