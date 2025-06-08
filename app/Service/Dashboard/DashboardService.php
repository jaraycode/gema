<?php

namespace App\Service\Dashboard;

use Illuminate\Support\Facades\Auth;

class DashboardService
{
    public function __construct()
    {
        //
    }

    public function getDataDashboard(?string $currentPath = null): array
    {
        $user = Auth::user();

        $navUser = [
            'name' => $user->first_name . ' ' . $user->last_name,
            'email' => $user->email,
            'avatar' => $user->avatar
        ];

        $navMain = [
            [
                'title' => 'Dashboard',
                'href' => '/',
                'icon' => 'IconDashboard',
            ],
            [
                'title' => 'Reportes',
                'href' => '#',
                'icon' => 'IconReport',
            ],
            [
                'title' => 'Personal',
                'href' => '#',
                'icon' => 'IconUser',
            ],
            [
                'title' => 'Departamento',
                'href' => '/department',
                'icon' => 'IconBuilding',
            ],
            [
                'title' => 'Equipo',
                'href' => '#',
                'icon' => 'IconAirConditioning',
            ],
            [
                'title' => 'Ubicacion',
                'href' => '#',
                'icon' => 'IconMapPin',
            ],
        ];

        // Marca isActive dinámicamente
        foreach ($navMain as &$item) {
            $item['isActive'] = $item['href'] === $currentPath;
        }

        return [
            'user' => $navUser,
            'navMain' => $navMain,
            'navSecondary' => [
                [
                    'title' => 'Obtener Ayuda',
                    'href' => '#',
                    'icon' => 'IconHelp',
                ],
                [
                    'title' => 'Ajustes',
                    'href' => '#',
                    'icon' => 'IconSettings',
                ],
            ],
        ];
    }
}
