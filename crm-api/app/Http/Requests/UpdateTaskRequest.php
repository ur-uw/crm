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
            'description' => 'string|nullable',
            'start_date' => 'date',
            'due_date' => 'date',
            // TODO:CHANGE status_id to status_slug
            'status_id' => 'numeric',
            'assigned_to' => 'required|array',
            'assigned_to.*' => 'required|exists:users,slug',
        ];
    }
}
