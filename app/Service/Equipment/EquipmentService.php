<?php

namespace App\Service\Equipment;

use App\Models\Equipment;
use App\Repository\Core\SidebarRepository;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class EquipmentService
{
    private string $title = 'Equipo';

    public function __construct(protected SidebarRepository $menu) {}

    public function getMenu(): array
    {
        return setActiveRoute(menu: $this->menu->getSidebarMenu(), title: $this->title);
    }

    public function getAllEquipments(): LengthAwarePaginator
    {
        return Equipment::paginate(perPage: Equipment::count())->through(callback: function ($value): mixed {
            $value->level = castLevel(index: $value->level - 1);
            return $value;
        });
    }

}
