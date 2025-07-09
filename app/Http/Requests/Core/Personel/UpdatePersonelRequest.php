<?php

namespace App\Http\Requests\Core\Personel;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePersonelRequest extends FormRequest
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
      "email" => "sometimes|email|string",
      "password" => "sometimes|string",
      "national_status" => "sometimes|string",
      "dni" => "sometimes|integer",
      "phone_number" => "sometimes|string", // max 13 caracteres usando el formato para +584121164027
      // "first_name" => "sometimes|string",
      // "second_name" => "sometimes|string",
      // "second_last_name" => "sometimes|string",
      "name" => "sometimes|string",
      "last_name" => "sometimes|string",
      "department" => "sometimes|string",
    ];
  }

  public function messages(): array
  {
    return [
      'email.sometimes' => 'El correo es un campo obligatorio.',
      'email.email' => 'El correo tiene que ser un formato válido de correo.',
      'email.string' => 'El correo tiene que ser un campo de texto.',
      'national_status.sometimes' => 'El estatuto nacional es obligatorio.',
      'national_status.integer' => 'El estatuto nacional debe ser un valor numérico.',
      'dni.sometimes' => 'La cédula es un campo obligatorio.',
      'dni.string' => 'La cédula debe ser un campo de texto.',
      'password.sometimes' => 'La contraseña es un campo obligatorio.',
      'password.string' => 'La contraseña debe ser un campo de texto.',
      'phone_number.sometimes' => 'El número de teléfono es obligatorio.',
      'phone_number.string' => 'El número de teléfono tiene que ser una cadena de texto.',
      'name.sometimes' => 'El nombre es obligatorio.',
      'name.string' => 'El nombre tiene que ser una cadena de texto.',
      'department.sometimes' => 'El departamento es obligatorio.',
      'department.string' => 'El departamento tiene que ser una cadena de texto.',
      'last_name.sometimes' => 'El apellido es un campo obligatorio.',
      'last_name.string' => 'El apellido debe ser un campo de texto.',
    ];
  }
}
