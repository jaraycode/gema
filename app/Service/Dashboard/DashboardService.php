<?php

namespace App\Service\Dashboard;

use App\Repository\Core\SidebarRepository;

class DashboardService
{

    private string $title = 'Dashboard';

    public function __construct(protected SidebarRepository $menu) {}

    public function getMenu(): array
    {
        return setActiveRoute(menu: $this->menu->getSidebarMenu(), title: $this->title);
    }
}
