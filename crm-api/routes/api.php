<?php


use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//** Tasks *//


Route::prefix('task')->group(function () {
    // Get all tasks
    Route::get('/', [TaskController::class, 'index']);
    // Create new task
    Route::post('/', [TaskController::class, 'store']);
    // Edit task
    Route::put('/{id}', [TaskController::class, 'update']);
    // Delete a
    Route::delete('/{id}', [TaskController::class, 'destroy']);
    // Mark task as completed
    Route::put('/changestatus/{id}', [TaskController::class, 'changeStatus']);
});