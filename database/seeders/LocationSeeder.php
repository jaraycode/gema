<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = [
            [
                'name' => 'Módulo 2',
                'code' => 'M2',
                'level' => 1
            ],
            [
                'name' => 'Módulo AR',
                'code' => 'MAR',
                'level' => 1
            ],
            [
                'name' => 'Módulo 4',
                'code' => 'M4',
                'level' => 1
            ],
            [
                'name' => 'Planta baja',
                'code' => 'PB',
                'level' => 2
            ],
            [
                'name' => 'Piso 1',
                'code' => 'P1',
                'level' => 2
            ],
            [
                'name' => 'Piso 2',
                'code' => 'P2',
                'level' => 2
            ],
            [
                'name' => 'Piso 3',
                'code' => 'P3',
                'level' => 2
            ],
            [
                'name' => 'Piso 4',
                'code' => 'P4',
                'level' => 2
            ],
            [
                'name' => 'Jardines',
                'code' => 'JAR',
                'level' => 3
            ],
            [
                'name' => 'Entrada',
                'code' => 'ENT',
                'level' => 3
            ],
            [
                'name' => 'Baños',
                'code' => 'BAÑ',
                'level' => 3
            ],
            [
                'name' => 'Pasillos',
                'code' => 'PAS',
                'level' => 3
            ],
            [
                'name' => 'Oficinas',
                'code' => 'OFIC',
                'level' => 3
            ],
            [
                'name' => 'Sala juicio',
                'code' => 'SJU',
                'level' => 3
            ],
            [
                'name' => 'Sala uso multiples',
                'code' => 'SUM',
                'level' => 3
            ],
            [
                'name' => 'Aula tecnologica',
                'code' => 'AUT',
                'level' => 3
            ],
            [
                'name' => 'Sala ellacuría',
                'code' => 'ELL',
                'level' => 3
            ],
            [
                'name' => 'Departamento extension social universitaria',
                'code' => 'DESU',
                'level' => 3
            ],
            [
                'name' => 'Centro de asesoramiento y desarrollo humano',
                'code' => 'CADH',
                'level' => 3
            ],
            [
                'name' => 'Departamento de identidad y misión',
                'code' => 'DIM',
                'level' => 3
            ],
            [
                'name' => 'Tanquillas',
                'code' => 'TAN',
                'level' => 3
            ],
            [

                'name' => 'Aires acondicionados',
                'code' => 'ACC',
                'level' => 4
            ],
            [
                'name' => 'Ventanas',
                'code' => 'VEN',
                'level' => 4
            ],
            [
                'name' => 'Luminarias',
                'code' => 'LUM',
                'level' => 4
            ],
            [
                'name' => 'Puertas',
                'code' => 'PUE',
                'level' => 4
            ],
            [
                'name' => 'Paredes',
                'code' => 'PAR',
                'level' => 4
            ],
            [
                'name' => 'Techos',
                'code' => 'TEC',
                'level' => 4
            ],
            [
                'name' => 'Filtro bebedero',
                'code' => 'FIB',
                'level' => 4
            ],
            [
                'name' => 'Baños damas',
                'code' => 'DAM',
                'level' => 4
            ],
            [
                'name' => 'Baños caballeros',
                'code' => 'CAB',
                'level' => 4
            ],
            [
                'name' => 'Central Contraincendios',
                'code' => 'CCI',
                'level' => 4
            ],
            [
                'name' => 'Salida de emergencia',
                'code' => 'EME',
                'level' => 4
            ],
            [
                'name' => 'Entrada principal',
                'code' => 'PPAL',
                'level' => 4
            ],
            [
                'name' => 'Tanquillas electricas',
                'code' => 'ELEC',
                'level' => 4
            ],
            [
                'name' => 'Drenajes',
                'code' => 'DRE',
                'level' => 4
            ]
        ];
        foreach ($locations as $location) {
            Location::create($location);
        }
    }
}
