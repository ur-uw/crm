<?php


use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

//** Contacts *//
Route::middleware(['auth:sanctum'])->group(function () {
    // TODO: Get single contact
    // Route::get('/show/{contact}', [ContactController::class, 'show']);
    // Get all USER contact
    Route::get('/get', [ContactController::class, 'index']);
    // Create new contact
    Route::post('/create', [ContactController::class, 'store']);
    // Update contact
    Route::put('/update/{contact}', [ContactController::class, 'update']);
    // Delete contact
    Route::delete('/delete/{contact}', [ContactController::class, 'destroy']);
});