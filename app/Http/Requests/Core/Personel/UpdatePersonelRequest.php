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
      "phone_number" => "string",
      "first_name" => "string",
      "last_name" => "string",
      "dni" => "string",
      "department" => "string",
    ];
  }

  public function messages(): array
  {
    return [
      "phone_number.string" => "The phone number must be a string.",
      "first_name.string" => "The first name must be a string.",
      "second_name.string" => "The second name must be a string.",
      "last_name.string" => "The last name must be a string.",
      "second_last_name.string" => "The second last name must be a string.",
      "dni.string" => "The dni must be a string.",
      "department.string" => "The department must be a string.",
    ];
  }
}
