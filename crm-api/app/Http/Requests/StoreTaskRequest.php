<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $has_tags = $this->input('tags') !== null;
        return [
            'title' => 'required|string',
            //Project Slug
            'project' => 'required|string|exists:projects,slug',
            //User Slug
            'created_by' => 'required|string|exists:users,slug',
            'description' => 'string|nullable',
            'start_date' => 'date',
            'due_date' => 'date|nullable|after:start_date',
            'assigned_to' => 'required|array',
            'assigned_to.*' => 'required|exists:users,slug',
            // Status Slug
            'status' => 'required|string|exists:statuses,slug',
            // Priority Slug
            'priority' => 'required|string|exists:priorities,slug',
            // Tags array
            'tags' => 'sometimes|array',
            'tags.*.name' => 'required_with:tags|string',
            'tags.*.color' => 'string|starts_with:#|nullable',
        ];
    }
}