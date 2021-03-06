<?php

namespace App\Http\Requests;

use Auth;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::user() != null && Auth::user()->slug === $this->user->slug;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => 'string|max:12',
            'last_name' => 'string|max:12',
            'email' => 'string|unique:users,email',
            'phone' => 'string|unique:users,phone',
            'password' => 'string|min:8|max:255'
        ];
    }
}
