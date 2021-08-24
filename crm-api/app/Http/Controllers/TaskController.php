<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\CreateTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Priority;
use App\Models\Project;
use App\Models\Status;
use App\Models\Team;
use App\Models\User;
use Auth;
use Date;
use Str;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        return TaskResource::collection(
            $request->user()->tasks()
                ->with('status:id,name,color,slug')
                ->orderBy('created_at', 'desc')
                ->get()
        );
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateTaskRequest $request)
    {
        $info = $request->validated();

        // Creating new task
        $task = Task::make($info);
        $task->project()->associate(Project::find($info['project']));
        $task->status()->associate(Status::firstWhere('slug', $info['status']));
        $task->priority()->associate(Priority::firstWhere('slug', $info['priority']));
        $task->save();
        // Assign task to authenticated user
        $request->user()->tasks()->sync($task);
        // Assign task to assigned user
        $users = User::whereIn('slug', $info['assigned_to'])
            ->get();
        $users->each(function (User $user) use ($task) {
            $user->tasks()->sync($task);
        });
        return TaskResource::make(
            $task->load('status:id,name,color,slug')
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        return TaskResource::make($task->load('status'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $taskId
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $user = $request->user();

        $team = Team::firstWhere('project_id', $task->project->id);
        if ($user->owns($task) || $user->isAbleTo('task-edit', $team)) {
            $task->update($request->validated());
            return TaskResource::make($task->load('status:id,name,color,slug'));
        }
        abort(
            Response::HTTP_FORBIDDEN,
            "You don't have the correct permissions for this action"
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Task $task)
    {
        $user = $request->user();
        $team = Team::firstWhere('project_id', $task->project->id);
        if ($user->owns($task) || $user->isAbleTo('task-delete', $team)) {
            $task->delete();
            return response()->json([
                'message' => 'Task Deleted',
                Response::HTTP_NO_CONTENT
            ]);
        }
        abort(
            Response::HTTP_FORBIDDEN,
            "You don't have the correct permissions for this action"
        );
    }
    public function changeStatus(Request $request, Task $task)
    {
        $request->validate(
            [
                'status_slug' => 'required',
            ]
        );
        $user = Auth::user();
        $team = Team::firstWhere('project_id', $task->project->id);
        if ($user->owns($task) || $user->isAbleTo('task-edit', $team)) {
            $status = Status::firstWhere('slug', $request->status_slug);
            $task->update([
                'status_id' => $status->id
            ]);
            return TaskResource::make($task);
        }
        abort(
            Response::HTTP_FORBIDDEN,
            "You don't have the correct permissions for this action"
        );
    }

    public function recently(Request $request, $number = 3)
    {
        $tasks = $request->user()
            ->tasks()
            ->with('status')
            ->recent()
            ->limit($number)
            ->get();
        return TaskResource::collection($tasks);
    }

    /*
        * Get tasks for a specified period *
    */
    public function forTheDate(Request $request, $date)

    {
        return TaskResource::collection(
            $request->user()
                ->tasks()
                ->with('status')
                ->where('status_id', '!=', '4')
                // ?NOTE: Bellow line means that the task is not denied
                ->where('status_id', '!=', '5')
                ->whereDate('tasks.start_date', Date::make($date))
                ->get(),
        );
    }
}
