<?php


use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//** Upcoming Task*//

// Get all tasks
Route::get('task', [TaskController::class, 'index']);

// Create new task
Route::post('task', [TaskController::class, 'store']);
// Edit task
Route::put('task/{id}', [TaskController::class, 'update']);
// Delete a
Route::delete('task/{id}', [TaskController::class, 'destroy']);
