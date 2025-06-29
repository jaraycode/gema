<?php

namespace App\Service\Util;

use App\Contracts\Correlative;
use App\Models\CorrIncidence;
use Exception;
use Illuminate\Support\Facades\Log;

class CorrelativeIncidence implements Correlative
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Esta función busca en la tabla correlative_incidence algún equipo que ya esté registrado para retornar su contador, en caso de que no lo encuentre ingresa su registro y retorna el correlativo #1.
     * @param string $equipment
     * @return mixed
     */
    public function getCorrelative(string $equipment): mixed
    {
        try {
            $year = intval(value: date(format: 'Y'));
            $correlativo = CorrIncidence::where(column: 'code', operator: '=', value: $equipment)->where(column: 'year', operator: '=', value: $year)->value(column: 'counter');

            if (empty($correlativo)) {
                $correlativo = 1;
                CorrIncidence::create(attributes: [
                    'year' => $year,
                    'code' => $equipment,
                    'counter' => $correlativo + 1
                ]);
            } else {
                CorrIncidence::where(column: 'code', operator: '=', value: $equipment)->where(column: 'year', operator: '=', value: $year)->update(attributes: ['counter' => $correlativo + 1]);
            }

            return $correlativo;
        } catch (Exception $e) {
            Log::error(message: $e->getMessage());
            return redirect()->back()->with(key: 'error', value: 'Error: correlativo de incidencias');
        }
    }
}
