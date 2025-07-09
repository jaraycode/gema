<?php

namespace App\Service\Dashboard;

use App\Models\Department;
use App\Models\Equipment;
use App\Models\Personel;
use App\Models\TechnicalLocation;
use App\Repository\Core\SidebarRepository;

class DashboardService
{

    private string $title = 'Dashboard';

    public function __construct(protected SidebarRepository $menu) {}

    public function getMenu(): array
    {
        return setActiveRoute(menu: $this->menu->getSidebarMenu(), title: $this->title);
    }

    public function getKpis(): array {
        return [
            "registeredEquipment"=> Equipment::count(),
            "technicalLocations" => TechnicalLocation::count(),
            "registeredPersonnel" => Personel::count(),
            "Departments" => Department::count(),
        ];

    }
}
