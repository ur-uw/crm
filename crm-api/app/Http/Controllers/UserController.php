<?php

namespace App\Http\Controllers;

use App\Http\Resources\ImageResource;
use App\Http\Resources\UserResource;
use App\Models\Image;
use Auth;
use Illuminate\Http\Request;
use Storage;
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

    /*
        * Get current authenticated user info
    */
    public function get_info()
    {
        $user = Auth::user();
        return UserResource::make($user);
    }

    /**
     * Upload user avatar image.
     *
     * @param  User  $user
     * @return \Illuminate\Http\Response
     */
    public function change_avatar(Request $request)
    {
        $request->validate([
            'image' => 'file|image|mimes:png,jpg,jpeg|max:5000',
        ]);
        $image = $request->file('image');
        $user = Auth::user();
        $image_folder_path = "images/profile_images/" . $user->slug;
        $image_name = time() . "__" . $image->getClientOriginalName();
        $file_path = $image->storeAs($image_folder_path, $image_name);

        $user_image = Image::make([
            'name' => $image->getClientOriginalName(),
            'path' => $file_path,
            'slug' => Str::slug($image->getClientOriginalName())
        ]);
        $user->images()->save($user_image);
        return ImageResource::make($user_image);
    }
}
