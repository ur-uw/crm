<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PermissionController;
use Illuminate\Support\Facades\Route;
// Login
Route::post('/login', [AuthController::class, 'login']);
// Register
Route::post('/register', [AuthController::class, 'register']);

Route::middleware(['auth:sanctum'])->group(function () {
    // Logout
    Route::get('/logout', [AuthController::class, 'logOut']);
    // Get all permission
    Route::get('/permissions/get', [PermissionController::class, 'index']);
});