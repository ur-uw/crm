<?php

namespace App\Http\Resources;

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
            "id" => $this->id,
            "title" => $this->title,
            "slug" => $this->slug,
            "description" => $this->description,
            "status" => $this->whenLoaded('status'),
            "created_by" => $this->created_by,
            "start_date" => $this->start_date,
            "due_date" => $this->due_date,
            'priority' => $this->whenLoaded('priority'),
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
