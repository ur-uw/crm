<?php

use App\Http\Controllers\TodayTaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//** Today Task*//
// Get all daily tasks

Route::get('dailytask', [TodayTaskController::class, 'index']);

// Create new daily task
Route::post('dailytask', [TodayTaskController::class, 'store']);

// Delete an daily task
Route::delete('dailytask/{taskId}', [TodayTaskController::class, 'destroy']);
