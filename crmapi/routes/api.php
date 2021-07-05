<?php

use App\Http\Controllers\TodayTaskController;
use App\Http\Controllers\UpcomingController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


//** Upcoming Task*//

// Get all upcoming tasks
Route::get('upcoming', [UpcomingController::class, 'index']);

// Create new upcoming
Route::post('upcoming', [UpcomingController::class, 'store']);

// Delete an upcoming
Route::delete('upcoming/{taskId}', [UpcomingController::class, 'destroy']);

//** Today Task*//
// Get all daily tasks

Route::get('dailytask', [TodayTaskController::class, 'index']);

// Create new daily task
Route::post('dailytask', [TodayTaskController::class, 'store']);

// Delete an daily task
Route::delete('dailytask/{taskId}', [TodayTaskController::class, 'destroy']);