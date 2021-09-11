<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddProjectUsersRequest extends FormRequest
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
            'users_permissions' => 'array|required',
            // user represents user->slug
            'users_permissions.*.user' => 'string|exists:users,slug',
            'users_permissions.*.permissions' => 'array',
            'users_permissions.*.permissions.*' => 'exists:permissions,name',
            'team' => 'string|required',
        ];
    }
}
