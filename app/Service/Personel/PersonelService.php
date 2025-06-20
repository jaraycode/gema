<?php

namespace App\Service\Personel;

use App\Repository\Core\SidebarRepository;

class PersonelService
{

    private string $title = 'Personal';

    public function __construct(protected SidebarRepository $menu) {}

    public function getMenu(): array
    {
        return setActiveRoute(menu: $this->menu->getSidebarMenu(), title: $this->title);
    }
}
