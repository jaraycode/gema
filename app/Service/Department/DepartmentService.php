<?php

namespace App\Service\Department;

use App\Repository\Core\SidebarRepository;

class DepartmentService
{

    private string $title = 'Departamento';

    public function __construct(protected SidebarRepository $menu) {}

    public function getMenu(): array
    {
        return setActiveRoute(menu: $this->menu->getSidebarMenu(), title: $this->title);
    }
}
