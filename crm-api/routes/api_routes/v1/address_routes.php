<?php

use App\Http\Controllers\AddressController;
use Illuminate\Support\Facades\Route;

//** Addresses *//
// Get single address
Route::get('/show/{address}', [AddressController::class, 'show']);
Route::middleware(['auth:sanctum'])->group(function () {
    // Get all address
    Route::get('/get', [AddressController::class, 'index']);
    // Create new address
    Route::post('/create', [AddressController::class, 'store']);
    // Update address
    Route::put('/update/{address}', [AddressController::class, 'update']);
    // Delete address
    Route::delete('/delete/{address}', [AddressController::class, 'destroy']);
});
