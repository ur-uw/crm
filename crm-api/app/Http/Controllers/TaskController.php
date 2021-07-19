<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\CreateTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Status;
use Validator;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return TaskResource::collection(
            Task::with('status:id,name,color,slug')
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
        $task = Task::with('status')->create($request->validated());


        return TaskResource::make(
            $task->load('status:id,name,color,slug')
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
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
}
