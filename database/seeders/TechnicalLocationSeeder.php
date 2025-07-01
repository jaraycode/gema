<?php

namespace Database\Seeders;

use App\Models\TechnicalLocation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TechnicalLocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TechnicalLocation::create(attributes: ['level1' => 1, 'level2' => 4, 'level3' => 13, 'level4' => 15, 'level5' => 22]);
        TechnicalLocation::create(attributes: ['level1' => 1, 'level2' => 4, 'level3' => 13, 'level4' => 16, 'level5' => 22]);
        TechnicalLocation::create(attributes: ['level1' => 1, 'level2' => 4, 'level3' => 13, 'level4' => 18, 'level5' => 22]);
        TechnicalLocation::create(attributes: ['level1' => 1, 'level2' => 4, 'level3' => 13, 'level4' => 19, 'level5' => 22]);
    }
}
