<?php

namespace App\Http\Requests;

use \Illuminate\Validation\ValidationException;
use Illuminate\Foundation\Http\FormRequest;
use \Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpFoundation\JsonResponse;

class CreateProjectRequest extends FormRequest
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
            'name' => 'required|string|unique:projects,name',
            // NOTE: THIS CAN BE REMOVED AFTER IMPLEMENTING SLUGS FOR TASK MODEL
            'slug' => 'required|string|unique:tasks,title',
            'description' => 'string',
            'user_id' => 'required|numeric|exists:statuses,id',
        ];
    }
}
