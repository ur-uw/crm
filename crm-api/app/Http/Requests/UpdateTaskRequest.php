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
            'project_id' => 'numeric',
            // NOTE: THIS CAN BE REMOVED AFTER IMPLEMENTING SLUGS FOR TASK MODEL
            'slug' => 'string|unique:tasks,title',
            'description' => 'string|nullable',
            'start_date' => 'date',
            'due_date' => 'date',
            'assigned_to' => 'array',
            'assigned_to.*' => 'exists:users,slug',
            'status_slug' => 'string|exists:statuses,slug',
            'priority_id' => 'numeric|exists:priorities,id'
        ];
    }
}
