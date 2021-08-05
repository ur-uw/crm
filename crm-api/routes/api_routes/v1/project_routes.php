<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
//** Projects *//
// Get single project
Route::get('/show/{project}', [ProjectController::class, 'show']);
Route::group(['middleware' => 'auth:sanctum'], function () {
    // Get all projects
    Route::get('/get', [ProjectController::class, 'index']);
    // Create new project
    Route::post('/create', [ProjectController::class, 'store']);
    // Update project
    Route::put('/update/{project}', [ProjectController::class, 'update']);
    // Delete project
    Route::delete('/delete/{project}', [ProjectController::class, 'destroy']);
});
