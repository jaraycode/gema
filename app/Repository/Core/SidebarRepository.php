<?php

namespace App\Repository\Core;

use Illuminate\Support\Facades\Auth;

class SidebarRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getSidebarMenu(): array
    {
        $user = Auth::user();
        $navUser = ['name' => $user->first_name . ' ' . $user->last_name, 'email' => $user->email, 'avatar' => $user->avatar];
        return [
            'user' => $navUser,
            'navMain' => [
                [
                    'title' => 'Dashboard',
                    'href' => 'home',
                    'icon' => 'IconDashboard',
                ],
                [
                    'title' => 'Reportes',
                    'href' => 'home',
                    'icon' => 'IconReport',
                ],
                [
                    'title' => 'Personal',
                    'href' => 'home',
                    'icon' => 'IconUser',
                ],
                [
                    'title' => 'Departamento',
                    'href' => 'home',
                    'icon' => 'IconBuilding',
                ],
                [
                    'title' => 'Equipo',
                    'href' => 'equipment.index',
                    'icon' => 'IconAirConditioning',
                ],
                [
                    'title' => 'Ubicación',
                    'href' => 'location.index',
                    'icon' => 'IconMapPin',
                ],
                [
                    'title' => 'Ubicación técnica',
                    'href' => 'technical-location.index',
                    'icon' => 'IconMapPin',
                ],
            ],
            'navSecondary' => [
                [
                    'title' => 'Obtener Ayuda',
                    'href' => 'home',
                    'icon' => 'IconHelp',
                ],
                [
                    'title' => 'Ajustes',
                    'href' => 'home',
                    'icon' => 'IconSettings',
                ],
            ],
        ];
    }
}
