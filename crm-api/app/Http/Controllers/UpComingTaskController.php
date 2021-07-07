<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUpcomingTaskRequest;
use App\Http\Resources\UpComingTaskResource;
use App\Models\UpComingTask;
use DB;
use Illuminate\Http\Request;

class UpComingTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return UpComingTaskResource::collection(UpComingTask::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateUpcomingTaskRequest $request)
    {
        return UpComingTask::create(
            [
                'title' => $request->title,
                'taskId' => $request->taskId,
                'waiting' => $request->waiting,
            ]
        );
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($taskId)
    {
        DB::table('up_coming_tasks')->where('taskId', $taskId)->delete();
        return response()->json(
            [
                'message' => 'Upcoming Deleted!',
            ],
            204
        );
    }
}
