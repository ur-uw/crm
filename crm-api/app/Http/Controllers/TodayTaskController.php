<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTodayTaskRequest;
use App\Http\Resources\TodayTaskResource;
use App\Models\TodayTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use Validator;

class TodayTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return TodayTaskResource::collection(
            TodayTask::orderBy('created_at', 'desc')
                ->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateTodayTaskRequest $request)
    {
        $task = TodayTask::create(
            [
                'id' => $request->id,
                'title' => $request->title,
                'taskId' => $request->taskId,
            ]
        );
        return TodayTaskResource::make($task);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $taskId
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $taskId)
    {
        $request->validate(
            [
                'title' => 'string',
                'taskId' => 'string',
            ]
        );
        TodayTask::where('taskId', $taskId)->update($request->all());
        return response()->json(
            [
                'message' => "task updated"
            ],
            Response::HTTP_ACCEPTED
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($taskId)
    {
        DB::table('today_tasks')->where('taskId', $taskId)->delete();

        return response()->json(['message' => 'Daily Task Deleted', 204]);
    }
}
