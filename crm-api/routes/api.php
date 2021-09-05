<?php

use App\Http\Controllers\ProjectController;
use App\Models\Contact;
use App\Models\User;
use Illuminate\Support\Facades\Route;
/*
    ! NOTE: if you are on windows change the  slash: "/" to back-slash: "\" in routes paths*
*/

//** Auth *//
Route::prefix('auth')->group(__DIR__ . '/api_routes/v1/auth_routes.php');

//** User *//
Route::prefix('user')->group(__DIR__ . '/api_routes/v1/user_routes.php');

//** Projects *//
Route::prefix('projects')->group(__DIR__ . '/api_routes/v1/project_routes.php');


//** Tasks *//
Route::prefix('tasks')->group(__DIR__ . '/api_routes/v1/task_routes.php');

//** Statues *//
Route::prefix('statues')->group(__DIR__ . '/api_routes/v1/status_routes.php');

//** Priorities *//
Route::prefix('priorities')->group(__DIR__ . '/api_routes/v1/priority_routes.php');


//** Addresses *//
Route::prefix('addresses')->group(__DIR__ . '/api_routes/v1/address_routes.php');

//** Addresses *//
Route::prefix('tags')->group(__DIR__ . '/api_routes/v1/tag_routes.php');

//** Teams *//
Route::prefix('teams')->group(__DIR__ . '/api_routes/v1/team_routes.php');


//** Contacts *//
Route::prefix('contacts')->group(__DIR__ . '/api_routes/v1/contact_routes.php');

/* Testing routes */
Route::get('/test', function ($request) {
    $user = User::first();
    return $user;
});