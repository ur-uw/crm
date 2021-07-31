<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

//** Auth *//

Route::prefix('auth')->group(function () {
    // Login
    Route::post('/login', [AuthController::class, 'login']);
    // Register
    Route::post('/register', [AuthController::class, 'register']);
    // Logout
    Route::get('/logout', [AuthController::class, 'logOut'])->middleware('auth:sanctum');
    // Get user data
    Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');
});

//** Projects *//
// Get single project
Route::get('/project/show/{project}', [ProjectController::class, 'show']);

Route::group(['middleware' => 'auth:sanctum'], function () {
    // Get all projects
    Route::get('/projects', [ProjectController::class, 'index']);
    // Create new project
    Route::post('/project/create', [ProjectController::class, 'store']);
    // Update project
    Route::put('/project/update/{project}', [ProjectController::class, 'update']);
    // Delete project
    Route::delete('/project/delete/{project}', [ProjectController::class, 'destroy']);
});


//** Tasks *//
// Get single task
Route::get('/task/show/{task}', [TaskController::class, 'show']);
// Mark task as completed
Route::put('/task/changestatus/{task}', [TaskController::class, 'changeStatus']);
// Protected routes
Route::group(['middleware' => 'auth:sanctum'], function () {
    // Get all tasks
    Route::get('/tasks', [TaskController::class, 'index']);
    // Get all for the specified date
    Route::get('/tasks/for/{date}', [TaskController::class, 'forTheDate'])
        ->where('date', '[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])');
    // Get recently tasks
    Route::get('/tasks/recently/{number}', [TaskController::class, 'recently'])
        ->whereNumber('number');
    // Create new task
    Route::post('/task/create', [TaskController::class, 'store']);
    // Update task
    Route::put('/task/update/{task}', [TaskController::class, 'update']);
    // Delete task
    Route::delete('/task/delete/{task}', [TaskController::class, 'destroy']);
});

//** Addresses *//
Route::prefix('addresses')->group(function () {
    // Get single address
    Route::get('/show/{address}', [AddressController::class, 'show']);
    Route::middleware(['auth:sanctum'])->group(function () {
        // Get all address
        Route::get('/get', [AddressController::class, 'index']);
        // Create new address
        Route::post('/create', [AddressController::class, 'store']);
        // Update address
        Route::put('/update/{address}', [AddressController::class, 'update']);
        // Delete address
        Route::delete('/delete/{address}', [AddressController::class, 'destroy']);
    });
});
