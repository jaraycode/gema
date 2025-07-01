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
     * get the validation rules that apply to the request.
     *
     * @return array<string, \illuminate\contracts\validation\validationrule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
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
     * returns the messages for the validation rules specified beforehand
     *
     * @return array<string, \illuminate\contracts\validation\validationrule|array<mixed>|string>
     */
    public function messages(): array
    {
        return [
            'model.required' => 'es necesario ingresar el modelo',
            'model.string' => 'el modelo tiene que ser una cadena de texto',
            'brand.required' => 'es necesario ingresar el marca',
            'brand.string' => 'el marca tiene que ser una cadena de texto',
            'serial.required' => 'es necesario ingresar el serial del equipo',
            'serial.string' => 'el serial tiene que ser una cadena de texto',
            'type.required' => 'es necesario ingresar el tipo de equipo',
            'type.string' => 'el tipo tiene que ser una cadena de texto',
            'description.required' => 'es necesario ingresar la descripción del equipo',
            'description.string' => 'la descripción tiene que ser una cadena de texto',
            'technical_location.required' => 'es necesario ingresar la ubicación técnica del equipo',
            'technical_location.string' => 'la ubicación técnica tiene que ser una cadena de texto',
            'status.required' => 'es necesario ingresar el estado del equipo',
            'status.integer' => 'es necesario que el estado del equipo sea un valor numérico',
        ];
    }
}
