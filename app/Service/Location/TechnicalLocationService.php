<?php

namespace App\Service\Location;
use App\Repository\Core\SidebarRepository;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class TechnicalLocationService
{
    private string $title = 'Ubicación técnica';

    public function __construct(protected SidebarRepository $menu) {}

    public function getMenu(): array
    {
        return setActiveRoute(menu: $this->menu->getSidebarMenu(), title: $this->title);
    }
}