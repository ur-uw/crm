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
            "created_by" => $this->created_by,
            "start_date" => Carbon::parse($this->start_date)->toDateTimeString(),
            "due_date" => Carbon::parse($this->due_date)->toDateTimeString(),
            'priority' => PriorityResource::make($this->whenLoaded('priority')),
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}