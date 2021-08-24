<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePriorityRequest;
use App\Http\Requests\UpdatePriorityRequest;
use App\Http\Resources\PriorityResource;
use App\Models\Priority;
use Auth;
use Illuminate\Http\Request;
use Str;
use Symfony\Component\HttpFoundation\Response;

class PriorityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PriorityResource::collection(Priority::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePriorityRequest $request)
    {
        $priority = Priority::create($request->validated());
        return PriorityResource::make($priority);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Priority  $priority
     * @return \Illuminate\Http\Response
     */
    public function show(Priority $priority)
    {
        return PriorityResource::make($priority);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Priority  $priority
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePriorityRequest $request, Priority $priority)
    {
        $priority->update($request->validated());
        return PriorityResource::make($priority);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Priority  $priority
     * @return \Illuminate\Http\Response
     */
    public function destroy(Priority $priority)
    {
        if (Auth::user()->isAn('super-admin')) {
            $priority->delete();
            return response()->json([
                'message' => 'Priority Deleted',
                Response::HTTP_NO_CONTENT
            ]);
        }
        abort(
            Response::HTTP_FORBIDDEN,
            "You don't have the correct permissions for this action"
        );
    }
}
