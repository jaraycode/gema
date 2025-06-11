<?php

if (!function_exists('setActiveRoute')) {
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

if (!function_exists('castLevel')) {
    /**
     * This function needs the index to then return a name based on the levels of the locations
     * @param int $index
     * @return string
     */
    function castLevel(int $index): string
    {
        $casting = ['Módulo', 'Piso', 'Oficina', 'Equipo'];
        return $casting[$index];
    }
}
