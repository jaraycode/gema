<?php

namespace App\Http\Requests\Core\Department;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDepartmentRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'code' => ['required', 'string', 'max:10']
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
            'code.required' => 'Es necesario ingresar el código',
            'code.string' => 'El código tiene que ser una cadena de texto',
            'code.max' => 'El código no puede tener más de 10 caracteres',
        ];
    }
}
