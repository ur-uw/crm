<?php

namespace App\Http\Controllers;

use App\Http\Resources\ImageResource;
use App\Models\Image;
use Auth;
use Illuminate\Http\Request;
use Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
    public function destroy($id)
    {
        //
    }

    /**
     * Upload user avatar image.
     *
     * @param  User  $user
     * @return \Illuminate\Http\Response
     */
    public function upload_avatar(Request $request)
    {
        $request->validate([
            'image' => 'file|image|mimes:png,jpg,jpeg|size:5000',
        ]);
        $image = $request->file('image');
        $user = Auth::user();
        $image_folder_path = "images/profile_images" . $user->slug;
        $image_name = now()->toDateTimeLocalString() . "__" . $image->getClientOriginalName();
        $image->storePubliclyAs($image_folder_path, $image_name);

        $user_image = Image::create([
            'name' => $image->getClientOriginalName(),
            'path' => $image->path(),
            'slug' => Str::slug($image->getClientOriginalName()),
        ]);
        $user->images()->save($user_image);
        return ImageResource::make($user_image);
    }
}
