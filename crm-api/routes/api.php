<?php

use App\Http\Controllers\TodayTaskController;
use App\Http\Controllers\UpComingTaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//** Upcoming Task*//

// Get all upcoming tasks
Route::get('upcoming', [UpComingTaskController::class, 'index']);

// Create new upcoming
Route::post('upcoming', [UpComingTaskController::class, 'store']);

// Delete an upcoming
Route::delete('upcoming/{taskId}', [UpComingTaskController::class, 'destroy']);


//** Today Task*//
// Get all daily tasks

Route::get('dailytask', [TodayTaskController::class, 'index']);
// Create new daily task
Route::post('dailytask', [TodayTaskController::class, 'store']);
// Edit daily task
Route::put('dailytask/{taskId}', [TodayTaskController::class, 'update']);
// Delete an daily task
Route::delete('dailytask/{taskId}', [TodayTaskController::class, 'destroy']);
