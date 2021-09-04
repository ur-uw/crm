<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $user_contacts = $this->whenLoaded('contacts');
        if (!($user_contacts instanceof \Illuminate\Http\Resources\MissingValue)) {
            $user_contacts =  $user_contacts->pluck('user_id')->toArray();
        } else {
            $user_contacts = null;
        }
        return [
            'name' => $this->full_name,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'slug' => $this->slug,
            'email' => $this->email,
            'phone' => $this->phone,
            'images' => ImageResource::collection($this->whenLoaded('images')),
            'profile_image' => ImageResource::make($this->profile_image),
            'addresses' => $this->whenLoaded('addresses'),
            'contacts' => $this->when(
                $user_contacts !== null,
                UserResource::collection(User::findMany($user_contacts))
            ),
        ];
    }
}
