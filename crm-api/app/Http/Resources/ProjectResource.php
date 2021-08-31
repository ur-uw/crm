<?php

namespace App\Http\Resources;

use App\Helpers\Utility;
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
        $tags_progress = Utility::get_project_tags_progress($this->whenLoaded('tasks'));
        return [
            'name' => $this->name,
            'description' => $this->description,
            'slug' => $this->slug,
            'owner' => UserResource::make($this->whenLoaded('user')),
            'users' => UserResource::collection($this->whenLoaded('users')),
            'teams' => TeamResource::collection($this->whenLoaded('teams')),
            'tasks' => TaskResource::collection($this->whenLoaded('tasks')),
            'tags_progress' => $this->whenLoaded('tasks', $tags_progress),
        ];
    }
}
