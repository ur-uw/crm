<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SearchController;
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

    // Get project users
    Route::get('/{project}/users', [ProjectController::class, 'get_users']);

    // Add user to the project
    Route::post('/{project}/add_user', [ProjectController::class, 'add_project_users']);

    // Search project users
    Route::post('/{project}/users/search', [SearchController::class, 'searchProjectUsers']);
});
