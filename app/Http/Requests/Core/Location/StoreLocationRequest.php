<?php

namespace App\Http\Requests\Core\Location;

use Illuminate\Foundation\Http\FormRequest;

class StoreLocationRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:50'],
            'code' => ['required', 'unique:location', 'string', 'max:4'],
            'level' => ['required', 'integer'],
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
            'code.unique' => 'El código ya existe en sistema',
            'code.max' => 'El código no puede tener más de 4 caracteres',
            'level.required' => 'Es necesario ingresar el nivel',
            'level.integer' => 'El nivel debe ser un valor numérico',
        ];
    }
}
