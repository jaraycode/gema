<?php

namespace App\Http\Requests\Core\Personel;

use Illuminate\Foundation\Http\FormRequest;

class StorePersonelRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "email" => "required|email|unique:personel,email|string",
            "password" => "required|string",
            "national_status" => "required|string",
            "dni" => "required|integer",
            "phone_number" => "required|string", // max 13 caracteres usando el formato para +584121164027
            // "first_name" => "required|string",
            // "second_name" => "sometimes|string",
            // "second_last_name" => "sometimes|string",
            "name" => "required|string",
            "last_name" => "required|string",
            "department" => "required|string",
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'The email field is required.',
            'email.email' => 'The email must be a valid email address.',
            'email.unique' => 'The email has already been taken.',
            'email.string' => 'The email must be a string.',

            'national_status.required' => 'El estatuto nacional es obligatorio.',
            'national_status.integer' => 'El estatuto nacional debe ser un valor numérico.',

            'dni.required' => 'The dni field is required.',
            'dni.string' => 'The dni must be a string.',

            'password.required' => 'The password field is required.',
            'password.string' => 'The password must be a string.',

            'phone_number.required' => 'The phone number field is required.',
            'phone_number.string' => 'The phone number must be a string.',

            'name.required' => 'El nombre es obligatorio.',
            'name.string' => 'El nombre tiene que ser una cadena de texto.',

            // 'first_name.required' => 'The first name field is required.',
            // 'first_name.string' => 'The first name must be a string.',

            // 'second_name.required' => 'The second name field is required.',
            // 'second_name.string' => 'The second name must be a string.',

            // 'last_name.required' => 'The last name field is required.',
            // 'last_name.string' => 'The last name must be a string.',

            // 'second_last_name.required' => 'The second last name field is required.',
            // 'second_last_name.string' => 'The second last name must be a string.',
        ];
    }
}
