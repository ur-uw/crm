<?php

namespace App\Http\Requests;

use \Illuminate\Validation\ValidationException;
use Illuminate\Foundation\Http\FormRequest;
use \Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpFoundation\JsonResponse;

class CreateTaskRequest extends FormRequest
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
            'priority' => 'required|string|exists:priorities,slug'
        ];
    }
}
