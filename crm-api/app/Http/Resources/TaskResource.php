<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
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
            "title" => $this->title,
            "slug" => $this->slug,
            "description" => $this->description,
            "status" => StatusResource::make($this->whenLoaded('status')),
            "tags" => TagResource::collection($this->whenLoaded('tags')),
            'priority' => PriorityResource::make($this->whenLoaded('priority')),
            'teams' => TeamResource::collection($this->whenLoaded('teams')),
            'users' => UserResource::collection($this->whenLoaded('users')),
            "created_by" => $this->created_by,
            "start_date" => Carbon::parse($this->start_date)->toDateTimeString(),
            "due_date" => Carbon::parse($this->due_date)->toDateTimeString(),
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
