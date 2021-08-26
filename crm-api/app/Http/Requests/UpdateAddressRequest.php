<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAddressRequest extends FormRequest
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
            'name' => "string",
            'country' => 'string',
            'address1' => "string",
            'address2' => "string",
            'state' => "string",
            'city' => "string",
            'zip' => "string|numeric",
        ];
    }
}
