<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
    // Get user data
    Route::get('/get_info', [UserController::class, 'get_info']);
    // Change user avatar
    Route::post('/update/{user}', [UserController::class, 'update']);
    // Change user avatar
    Route::post('/change_avatar', [UserController::class, 'change_avatar']);
});