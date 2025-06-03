<?php

namespace App\Service\Dashboard;

use Illuminate\Support\Facades\Auth;

class DashboardService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function getDataDashboard(): array
    {
        $user = Auth::user();
        $navUser = ['name' => $user->first_name . ' ' . $user->last_name, 'email' => $user->email, 'avatar' => $user->avatar];
        return [
            'user' => $navUser,
            'navMain' => [
                [
                    'title' => 'Dashboard',
                    'href' => '#',
                    'icon' => 'IconDashboard',
                    'isActive' => true,
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
                    'href' => '#',
                    'icon' => 'IconUser',
                ],
                [
                    'title' => 'Equipo',
                    'href' => '#',
                    'icon' => 'IconUser',
                ],
            ],
            'navSecondary' => [
                [
                    'title' => 'Obtener Ayuda',
                    'href' => '#',
                    'icon' => 'IconHelp',
                ],
                [
                    'title' => 'Settings',
                    'href' => '#',
                    'icon' => 'IconSettings',
                ],
            ],
        ];
    }
}
