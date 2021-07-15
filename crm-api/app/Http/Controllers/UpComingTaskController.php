<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUpcomingTaskRequest;
use App\Http\Resources\UpComingTaskResource;
use App\Models\UpComingTask;
use DB;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UpComingTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return UpComingTaskResource::collection(
            UpComingTask::orderBy('updated_at', 'desc')
                ->get()
        );
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
                'status' => $request->status ?? 'waiting',
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
    public function update(Request $request, $taskId)
    {
        $request->validate(
            [
                'title' => 'string',
                'taskId' => 'string',
            ]
        );
        UpComingTask::where('taskId', $taskId)->update($request->all());
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
        DB::table('up_coming_tasks')->where('taskId', $taskId)->delete();
        return response()->json(
            [
                'message' => 'Upcoming Deleted!',
            ],
            204
        );
    }
}
