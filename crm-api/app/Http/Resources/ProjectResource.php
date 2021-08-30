<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
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
            'name' => $this->name,
            'description' => $this->description,
            'slug' => $this->slug,
            'tags_progress' =>   $this->project_tags_progress,
            'owner' => UserResource::make($this->whenLoaded('user')),
            'users' => UserResource::collection($this->whenLoaded('users')),
            'teams' => TeamResource::collection($this->whenLoaded('teams')),
            'tasks' => TaskResource::collection($this->whenLoaded('tasks'))
        ];
    }
}
