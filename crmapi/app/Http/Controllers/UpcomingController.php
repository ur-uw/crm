<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUpcomingRequest;
use App\Http\Resources\UpcomingResource;
use App\Models\Upcoming;
use DB;
use Illuminate\Http\Request;

class UpcomingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return UpcomingResource::collection(Upcoming::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateUpcomingRequest $request)
    {
        return Upcoming::create(
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
        DB::table('upcomings')->where('taskId', $taskId)->delete();
        return response()->json(
            [
                'message' => 'Upcoming Deleted!',
            ],
            204
        );
    }
}