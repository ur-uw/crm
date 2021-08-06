<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;


// Get single task
Route::get('/show/{task}', [TaskController::class, 'show']);
// Mark task as completed
Route::put('/changestatus/{task}', [TaskController::class, 'changeStatus']);
// Protected routes
Route::group(['middleware' => 'auth:sanctum'], function () {
    // Get all tasks
    Route::get('/get', [TaskController::class, 'index']);
    // Get all for the specified date
    Route::get('/for/{date}', [TaskController::class, 'forTheDate'])
        ->where('date', '[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])');
    // Get recently tasks
    Route::get('/recently/{number}', [TaskController::class, 'recently'])
        ->whereNumber('number');
    // Create new task
    Route::post('/create', [TaskController::class, 'store']);
    // Update task
    Route::put('/update/{task}', [TaskController::class, 'update']);
    // Delete task
    Route::delete('/delete/{task}', [TaskController::class, 'destroy']);
});