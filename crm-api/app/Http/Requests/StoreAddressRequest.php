<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAddressRequest extends FormRequest
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
            'name' => "string|required",
            'country' => 'string|required',
            'address1' => "string|required",
            'address2' => "string|nullable",
            'state' => "string|required",
            'city' => "string|required",
            'zip' => "string|numeric",
        ];
    }
}
