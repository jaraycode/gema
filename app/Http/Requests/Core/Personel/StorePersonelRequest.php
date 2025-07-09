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
            "password" => "sometimes|string",
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
            'email.required' => 'El correo es un campo obligatorio.',
            'email.email' => 'El correo tiene que ser un formato válido de correo.',
            'email.unique' => 'El correo tiene que ser único.',
            'email.string' => 'El correo tiene que ser un campo de texto.',

            'national_status.required' => 'El estatuto nacional es obligatorio.',
            'national_status.integer' => 'El estatuto nacional debe ser un valor numérico.',

            'dni.required' => 'La cédula es un campo obligatorio.',
            'dni.string' => 'La cédula debe ser un campo de texto.',

            'password.required' => 'La contraseña es un campo obligatorio.',
            'password.string' => 'La contraseña debe ser un campo de texto.',

            'phone_number.required' => 'El número de teléfono es obligatorio.',
            'phone_number.string' => 'El número de teléfono tiene que ser una cadena de texto.',

            'name.required' => 'El nombre es obligatorio.',
            'name.string' => 'El nombre tiene que ser una cadena de texto.',

            'department.required' => 'El departamento es obligatorio.',
            'department.string' => 'El departamento tiene que ser una cadena de texto.',

            // 'first_name.required' => 'The first name field is required.',
            // 'first_name.string' => 'The first name must be a string.',

            // 'second_name.required' => 'The second name field is required.',
            // 'second_name.string' => 'The second name must be a string.',

            'last_name.required' => 'El apellido es un campo obligatorio.',
            'last_name.string' => 'El apellido debe ser un campo de texto.',

            // 'second_last_name.required' => 'The second last name field is required.',
            // 'second_last_name.string' => 'The second last name must be a string.',
        ];
    }
}
