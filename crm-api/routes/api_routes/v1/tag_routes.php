<?php

use App\Http\Controllers\TagController;
use Illuminate\Support\Facades\Route;

//** Tags *//

Route::middleware(['auth:sanctum'])->group(function () {
    // Get all tag
    Route::get('/get', [TagController::class, 'index']);
    // Get single tag
    Route::get('/show/{tag}', [TagController::class, 'show']);
    // Create new tag
    Route::post('/create', [TagController::class, 'store']);
    // Update tag
    Route::put('/update/{tag}', [TagController::class, 'update']);
    // Delete tag
    Route::delete('/delete/{tag}', [TagController::class, 'destroy']);
});
