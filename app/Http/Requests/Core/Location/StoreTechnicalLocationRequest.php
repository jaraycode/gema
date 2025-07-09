<?php

namespace App\Http\Requests\Core\Location;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'level1' => ['required', 'integer', Rule::unique(table: 'technical_location')->where(column: function ($query): void {
                $query->where('level2', $this->level2)->where('level3', $this->level3)->where('level4', $this->level4)->where('level5', $this->level5)->where('level6', $this->level6)->where('level7', $this->level7);
            })],
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
            'level1.unique' => 'Esa ubicación técnica ya existe',
        ];
    }
}
