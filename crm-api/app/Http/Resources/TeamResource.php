<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TeamResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $users = $this->users;

        return [
            'name' => $this->name,
            'display_name' => $this->display_name,
            'description' => $this->description,
            'users' => $this->users,
        ];
    }
}