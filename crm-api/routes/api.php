<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\AuthController;
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
});


//** Tasks *//
Route::prefix('task')->group(function () {
    // Get all tasks
    Route::get('/', [TaskController::class, 'index']);
    // Get single tasks
    Route::get('/{task}', [TaskController::class, 'show']);
    // Create new task
    Route::post('/', [TaskController::class, 'store']);
    // Edit task
    Route::put('/{task}', [TaskController::class, 'update']);
    // Delete task
    Route::delete('/{task}', [TaskController::class, 'destroy']);
    // Mark task as completed
    Route::put('/changestatus/{task}', [TaskController::class, 'changeStatus']);
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
