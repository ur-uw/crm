<?php

use App\Http\Controllers\TeamController;
use Illuminate\Support\Facades\Route;

//** Teams *//
// Get single team
Route::get('/show/{team}', [TeamController::class, 'show']);
Route::middleware(['auth:sanctum'])->group(function () {
    // Get all teams
    Route::get('/get', [TeamController::class, 'index']);
    // Create new team
    Route::post('/create', [TeamController::class, 'store']);
    // Update team
    Route::put('/update/{team}', [TeamController::class, 'update']);
    // Delete team
    Route::delete('/delete/{team}', [TeamController::class, 'destroy']);
});
