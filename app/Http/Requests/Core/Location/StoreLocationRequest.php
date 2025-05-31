<?php

namespace App\Http\Requests\Core\Location;

use Illuminate\Foundation\Http\FormRequest;

class StoreLocationRequest extends FormRequest
{

    protected $redirect = '';

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:50'],
            'code' => ['required', 'string', 'max:4'],
            'level_min' => ['required', 'integer'],
            'level_max' => ['required', 'integer'],
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
            'name.required' => 'Es necesario ingresar el nombre',
            'name.string' => 'El nombre tiene que ser una cadena de texto',
            'name.max' => 'El nombre no puede tener más de 50 caracteres',
            'code.required' => 'Es necesario ingresar el código',
            'code.string' => 'El código tiene que ser una cadena de texto',
            'code.max' => 'El código no puede tener más de 4 caracteres',
            'level_min.required' => 'Es necesario ingresar el nivel mínimo',
            'level_min.integer' => 'El nivel debe ser un valor numérico',
            'level_max.required' => 'Es necesario ingresar el nivel máximo',
            'level_max.integer' => 'El nivel debe ser un valor numérico',
        ];
    }
}
