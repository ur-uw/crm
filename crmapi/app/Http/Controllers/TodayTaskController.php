<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTodayTaskRequest;
use App\Http\Resources\TodayTaskResource;
use App\Models\Today;
use DB;
use Illuminate\Http\Request;

class TodayTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return TodayTaskResource::collection(Today::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateTodayTaskRequest $request)
    {
        $task = Today::create(
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
        DB::table('todays')->where('taskId', $taskId)->delete();

        return response()->json(['message' => 'Daily Task Deleted', 204]);
    }
}