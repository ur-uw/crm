<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TeamResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\Team;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $projects = $user->projects;
        return ProjectResource::collection($projects);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateProjectRequest $request)
    {
        $project = Project::make($request->validated());
        $request->user()->projects()->save($project);
        return ProjectResource::make($project);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
        return ProjectResource::make(
            $project->load('tasks.status')
                ->load('teams.users')
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $team = Team::firstWhere('project_id', $project->id);
        $user = $request->user();
        if ($user->owns($project) || $user->isAbleTo('project-update', $team)) {
            $project->update($request->validated());
            return ProjectResource::make($project);
        }
        abort(
            Response::HTTP_FORBIDDEN,
            "You don't have the correct permissions for this action"
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Project $project)
    {
        $user = $request->user();
        $team = Team::firstWhere('project_id', $project->id);
        if ($user->owns($project) || $user->hasRole('moderator', $team) || $user->isAbleTo('project-delete', $team)) {
            $project->delete();
            return response()->json([
                'message' => 'Project Deleted',
                Response::HTTP_NO_CONTENT
            ]);
        }
        abort(
            Response::HTTP_FORBIDDEN,
            "You don't have the correct permissions for this action"
        );
    }
    /**
     * Get project's users.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function getUsers(Request $request, Project $project)
    {
        $withTeams = $request->withTeams;
        if ($withTeams) {
            return TeamResource::collection(
                $project->teams()
                    ->with('users')
                    ->get()
            );
        }
        return UserResource::collection($project->users);
    }
}
