<?php

namespace App\Http\Requests\Core\Equipment;

use Illuminate\Foundation\Http\FormRequest;

class StoreEquipmentRequest extends FormRequest
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
            //
            'model' => ['required', 'string', 'max:255'],
            'brand' => ['required', 'string', 'max:255'],
            'serial' => ['required', 'string'],
            'type' => ['required', 'string'],
            'description' => ['required', 'string'],
            'technical_location' => ['required', 'string'],
            'status' => ['required', 'integer']
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
            'model.required' => 'Es necesario ingresar el modelo',
            'model.string' => 'El modelo tiene que ser una cadena de texto',
            'brand.required' => 'Es necesario ingresar el marca',
            'brand.string' => 'El marca tiene que ser una cadena de texto',
            'serial.required' => 'Es necesario ingresar el serial del equipo',
            'serial.string' => 'El serial tiene que ser una cadena de texto',
            'type.required' => 'Es necesario ingresar el tipo de equipo',
            'type.string' => 'El tipo tiene que ser una cadena de texto',
            'description.required' => 'Es necesario ingresar la descripción del equipo',
            'description.string' => 'La descripción tiene que ser una cadena de texto',
            'technical_location.required' => 'Es necesario ingresar la ubicación técnica del equipo',
            'technical_location.string' => 'La ubicación técnica tiene que ser una cadena de texto',
            'status.required' => 'Es necesario ingresar el estado del equipo',
            'status.integer' => 'Es necesario que el estado del equipo sea un valor numérico',
        ];
    }
}
