<?php

namespace App\Contracts;

interface Correlative
{
    public function getCorrelative(string $equipment): mixed;
}
