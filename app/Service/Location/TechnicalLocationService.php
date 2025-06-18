<?php

namespace App\Service\Location;

use App\Models\TechnicalLocation;
use App\Repository\Core\SidebarRepository;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;

class TechnicalLocationService
{
    private string $title = 'Ubicación técnica';

    public function __construct(protected SidebarRepository $menu) {}

    public function getMenu(): array
    {
        return setActiveRoute(menu: $this->menu->getSidebarMenu(), title: $this->title);
    }

    public function storeTechnicalLocation(array $technicalLocation): RedirectResponse
    {
        try {
            $response = TechnicalLocation::create(attributes: $technicalLocation);
            if ($response) return redirect()->route(route: 'technical-location.index')->with(key: 'success', value: 'Ubicación técnica creada exitosamente');
            return redirect()->back()->with(key: 'error', value: 'No se pudo crear la ubicación técnica. Intente nuevamente!');
        } catch (Exception $e) {
            Log::error(message: 'Creación de ubicación ' . $e->getMessage());
            throw new Exception(message: "Error al guardar ubicación: " . $e->getMessage());
        }
    }
}
