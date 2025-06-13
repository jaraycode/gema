<?php

namespace App\Http\Requests\Core\Location;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLocationRequest extends FormRequest
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
            'name' => ['string', 'max:50'],
            'code' => ['string', 'max:4'],
            'level_min' => ['integer'],
            'level_max' => ['integer'],
        ];
    }

    /**
     * Returns the messages for the validation rules specified beforehand
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function messages(): array
    {
        return [
            'name.string' => 'El nombre tiene que ser una cadena de texto',
            'name.max' => 'El nombre no puede tener más de 50 caracteres',
            'code.string' => 'El código tiene que ser una cadena de texto',
            'code.max' => 'El código no puede tener más de 4 caracteres',
            'level_min.integer' => 'El nivel debe ser un valor numérico',
            'level_max.integer' => 'El nivel debe ser un valor numérico',
        ];
    }
}
