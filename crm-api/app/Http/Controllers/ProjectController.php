<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\User;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Http\Resources\TeamResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\ProjectResource;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Requests\AddProjectUsersRequest;
use Illuminate\Support\Collection;
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
     * @param  \App\Http\Requests\StoreProjectRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProjectRequest $request)
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
        $project = $project->load(
            [
                'user',
                'users',
                'teams',
                'tasks.status',
                'tasks.tags',
                'tasks.users',
                'tasks.priority'
            ]
        );

        return ProjectResource::make($project);
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
    public function get_users(Request $request, Project $project)
    {
        $withTeams = $request->withTeams;
        if ($withTeams) {
            return TeamResource::collection(
                $project->teams()
                    ->with('users.images')
                    ->get()
            );
        }
        return UserResource::collection($project->users);
    }

    /**
     * Add user to a project.
     *
     * @param  \App\Http\Requests\AddProjectUsersRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function add_project_users(AddProjectUsersRequest $request, Project $project)
    {
        $data = $request->validated();
        $team = Team::firstWhere('name', $data['team']);
        $users = new Collection();
        if (!$team) {
            $team = Team::make([
                'display_name' => $data['team'],
            ]);
            $project->teams()->save($team);
        }
        foreach ($data['users_permissions'] as $user_permissions) {
            $user = User::with('images')->firstWhere('slug', $user_permissions['user']);
            $users->add($user);
            $team->users()->save($user);
            // Attaching permissions
            if (count($user_permissions['permissions']) > 0) {
                // FIXME: FIX N+1 QUERY
                $user->attachPermissions($user_permissions['permissions'], $team);
            } else {
                $user->attachPermission('task-read', $team);
            }
        }
        return response()->json([
            'message' => 'Users added',
            'users' => UserResource::collection($users)
        ], Response::HTTP_ACCEPTED);
    }
}