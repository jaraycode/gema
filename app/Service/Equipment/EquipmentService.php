<?php

namespace App\Service\Equipment;

use App\Contracts\Correlative;
use App\Models\Equipment;
use App\Repository\Core\SidebarRepository;
use App\Service\Util\CorrelativeEquipment;
use Illuminate\Pagination\LengthAwarePaginator;

class EquipmentService
{
    private string $title = 'Equipo';
    private Correlative $correlativeService;

    public function __construct(protected SidebarRepository $menu)
    {
        $this->correlativeService = new CorrelativeEquipment();
    }

    public function getMenu(): array
    {
        return setActiveRoute(menu: $this->menu->getSidebarMenu(), title: $this->title);
    }

    public function getAllEquipments(): LengthAwarePaginator
    {
        return Equipment::paginate(perPage: Equipment::count());
    }
}
