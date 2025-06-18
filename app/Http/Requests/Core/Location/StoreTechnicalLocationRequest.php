<?php

namespace App\Http\Requests\Core\Location;

use Illuminate\Foundation\Http\FormRequest;

class StoreTechnicalLocationRequest extends FormRequest
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
            'level1' => ['required', 'integer'],
            'level2' => ['required', 'integer'],
            'level3' => ['required', 'integer'],
            'level4' => ['required', 'integer'],
            'level5' => ['sometimes'],
            'level6' => ['sometimes'],
            'level7' => ['sometimes'],
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
            'level1.required' => 'Es necesario ingresar el nivel',
            'level2.required' => 'Es necesario ingresar el nivel',
            'level3.required' => 'Es necesario ingresar el nivel',
            'level4.required' => 'Es necesario ingresar el nivel',
            'level1.integer' => 'Es necesario ingresar un valor numérico',
            'level2.integer' => 'Es necesario ingresar un valor numérico',
            'level3.integer' => 'Es necesario ingresar un valor numérico',
            'level4.integer' => 'Es necesario ingresar un valor numérico',
            'level5.integer' => 'Es necesario ingresar un valor numérico',
            'level6.integer' => 'Es necesario ingresar un valor numérico',
            'level7.integer' => 'Es necesario ingresar un valor numérico',
        ];
    }
}
