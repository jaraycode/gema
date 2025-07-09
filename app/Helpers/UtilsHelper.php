<?php

use App\Models\Location;

if (!function_exists(function: 'setActiveRoute')) {
    /**
     * This function helps you set the active route of the sidebar menu given the title of the link
     * @param array $menu
     * @param string $title
     * @return array
     */
    function setActiveRoute(array $menu, string $title): array
    {
        foreach ($menu['navMain'] as $index => $value) {
            if ($value['title'] == $title) {
                $menu['navMain'][$index]['isActive'] = true;
            }
        }
        return $menu;
    }
}

if (!function_exists(function: 'castLevel')) {
    /**
     * This function needs the index to then return a name based on the levels of the locations
     * @param int $index
     * @return string
     */
    function castLevel(int $index): string
    {
        $casting = ['Edificio', 'Piso', 'Oficina', 'Equipo'];
        return $casting[$index];
    }
}

if (!function_exists(function: 'castEquipmentStatus')) {
    /**
     * This function needs the index to then return a name based on the levels of the locations
     * @param int $index
     * @return string
     */
    function castEquipmentStatus(int $index): string
    {
        $casting = ['Inactivo', 'Activo', 'Mantenimiento'];
        return $casting[$index];
    }
}

if (!function_exists(function: 'castLevelTechnicalLocation')) {
    /**
     * This function needs the index to then return a name based on the levels of the locations for technical locations
     * @param int $index
     * @return string
     */
    function castLevelTechnicalLocation(int $index): string
    {
        $casting = ['module', 'floor', 'area', 'equipment'];
        return $casting[$index];
    }
}

if (!function_exists(function: 'getCodeTechnicalLocation')) {
    /**
     * This function needs the index to then return a name based on the levels of the locations for technical locations
     * @param int $index
     * @return string
     */
    function getCodeTechnicalLocation(array $levels): string
    {
        $responseCode = '';
        foreach ($levels as $level) {
            if ($level) {
                $code = Location::where('delete_at')->where('id', '=', $level)->value('code');
                $responseCode .= $code . '-';
            }
        }
        return substr(string: $responseCode, offset: 0, length: -1);
    }
}

if (!function_exists(function: 'getMultipleCodeTechnicalLocation')) {
    /**
     * This function needs the index to then return a name based on the levels of the locations for technical locations
     * @param int $index
     * @return string
     */
    function getMultipleCodeTechnicalLocation(array $locations): array
    {
        $response = [];
        foreach ($locations as $location) {
            array_push($response, getCodeTechnicalLocation($location));
        }
        return $response;
    }
}
