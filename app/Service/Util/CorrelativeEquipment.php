<?php

namespace App\Service\Util;

use App\Contracts\Correlative;
use App\Models\CorrEquipment;
use Exception;
use Illuminate\Support\Facades\Log;

class CorrelativeEquipment implements Correlative
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Esta función busca en la tabla correlative_equipment algún equipo que ya esté registrado para retornar su contador, en caso de que no lo encuentre ingresa su registro y retorna el correlativo #1.
     * @param string $equipment
     * @return mixed
     */
    public function getCorrelative(string $equipment): mixed
    {
        try {
            $correlativo = CorrEquipment::where(column: 'code', operator: '=', value: $equipment)->value(column: 'counter');

            if (empty($correlativo)) {
                $correlativo = 1;
                CorrEquipment::create(attributes: [
                    'code' => $equipment,
                    'counter' => $correlativo + 1
                ]);
            } else {
                CorrEquipment::where(column: 'code', operator: '=', value: $equipment)->update(attributes: ['counter' => $correlativo + 1]);
            }

            return $correlativo;
        } catch (Exception $e) {
            Log::error(message: $e->getMessage());
            return redirect()->back()->with(key: 'error', value: 'Error: correlativo de equipos');
        }
    }
}
