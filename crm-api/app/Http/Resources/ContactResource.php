<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id ' => $this->id,
            'contact_info' => UserResource::make($this->contact_info),
            'type' => $this->type,
            'is_blocked' => $this->is_blocked
        ];
    }
}