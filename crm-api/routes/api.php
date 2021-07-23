<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use Illuminate\Routing\RouteGroup;
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


//** Tasks *//
// Get single tasks
Route::get('/{user}/task/{task}', [TaskController::class, 'show']);
// Mark task as completed
Route::put('/task/changestatus/{task}', [TaskController::class, 'changeStatus']);
// Protected routes
Route::group(['middleware' => 'auth:sanctum'], function () {
    // Get all tasks
    Route::get('/{user}/tasks', [TaskController::class, 'index']);
    // Create new task
    Route::post('/{user}/task', [TaskController::class, 'store']);
    // Edit task
    Route::put('/{user}/task/{task}', [TaskController::class, 'update']);
    // Delete task
    Route::delete('/{user}/task/{task}', [TaskController::class, 'destroy']);
});

//** Addresses *//

Route::prefix('address')->group(function () {
    // Get all address
    Route::get('/', [AddressController::class, 'index']);
    // Get single address
    Route::get('/{address}', [AddressController::class, 'show']);
    // Create new address
    Route::post('/', [AddressController::class, 'store']);
    // Edit address
    Route::put('/{address}', [AddressController::class, 'update']);
    // Delete address
    Route::delete('/{address}', [AddressController::class, 'destroy']);
});
