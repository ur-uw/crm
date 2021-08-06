<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\CreateTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Status;
use Date;

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
            $request->user()->tasks()->with('status:id,name,color,slug')
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
        $task = Task::create($request->validated());
        $request->user()->tasks()->attach($task);
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
        $task->update($request->validated());
        return TaskResource::make($task->load('status:id,name,color,slug'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json([
            'message' => 'Task Deleted',
            Response::HTTP_NO_CONTENT
        ]);
    }
    public function changeStatus(Request $request, Task $task)
    {
        $request->validate(
            [
                'status_slug' => 'required',
            ]
        );
        $status = Status::where('slug', $request->status_slug)->first();
        $task->status()->associate($status);
        $task->save();
        return TaskResource::make($task);
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