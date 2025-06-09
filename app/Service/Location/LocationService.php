<?php

namespace App\Service\Location;

use App\Models\Location;
use App\Repository\Core\SidebarRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class LocationService
{
    private string $title = 'Ubicación';

    public function __construct(protected SidebarRepository $menu) {}

    public function getMenu(): array
    {
        return setActiveRoute(menu: $this->menu->getSidebarMenu(), title: $this->title);
    }

    public function getAllLocations(): LengthAwarePaginator
    {
        return Location::paginate(perPage: 10);
    }

    public function getLocation(int $id): Collection
    {
        return Location::find(id: $id)->get();
    }
}
