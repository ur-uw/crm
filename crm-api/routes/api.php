<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

//** Tasks *//


Route::prefix('task')->group(function () {
    // Get all tasks
    Route::get('/', [TaskController::class, 'index']);
    // Create new task
    Route::post('/', [TaskController::class, 'store']);
    // Edit task
    Route::put('/{id}', [TaskController::class, 'update']);
    // Delete task
    Route::delete('/{id}', [TaskController::class, 'destroy']);
    // Mark task as completed
    Route::put('/changestatus/{id}', [TaskController::class, 'changeStatus']);
});


Route::prefix('address')->group(function () {
    // Get all address
    Route::get('/', [AddressController::class, 'index']);
    // Create new address
    Route::post('/', [AddressController::class, 'store']);
    // Edit address
    Route::put('/{address}', [AddressController::class, 'update']);
    // Delete address
    Route::delete('/{id}', [AddressController::class, 'destroy']);
});