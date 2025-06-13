<?php

namespace App\Enums\Location;

enum LocationLevel: int
{
    case MODULE = 1;
    case FLOOR = 2;
    case OFFICE = 3;
    case EQUIPMENT = 4;

    public function getLabel(): string
    {
        return match ($this) {
            self::MODULE => 'Módulo',
            self::FLOOR => 'Piso',
            self::OFFICE => 'Oficina',
            self::EQUIPMENT => 'Equipo',
        };
    }
}
