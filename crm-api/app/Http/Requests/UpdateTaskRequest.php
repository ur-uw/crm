<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
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
        return [
            'title' => 'string',
            //Project slug
            'project' => 'numeric',
            'description' => 'string|nullable',
            'start_date' => 'date',
            'due_date' => 'date|nullable|after:start_date',
            'assigned_to' => 'array',
            'assigned_to.*' => 'exists:users,slug',
            // Status Slug
            'status' => 'string|exists:statuses,slug',
            // Priority slug
            'priority' => 'string|exists:priorities,slug'
        ];
    }
}