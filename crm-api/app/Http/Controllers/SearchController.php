<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Project;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /*
        * Get project users
    */
    public function searchProjectUsers(Request $request, Project $project)
    {
        $request->validate([
            'q' => 'required|string'
        ]);
        return UserResource::collection(
            $project->users()
                ->where('users.name', 'like', '%' . $request->q . '%')
                ->get()
        );
    }
}
