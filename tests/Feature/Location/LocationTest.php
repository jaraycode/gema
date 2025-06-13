<?php

use App\Models\Location;
use App\Models\Personel;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test(description: 'Usuarios sin permiso son redirigidos al login', closure: function (): void {
    $this->get('/location')->assertRedirect('/login');
});

test(description: 'Usuario autenticado puede vistualizar página principal de ubicaciones', closure: function (): void {
    $this->actingAs($user = Personel::factory()->create());
    $this->get(route(name: 'location.index'))->assertOK();
});

test(description: 'Usuario autenticado puede crear una nueva ubicación', closure: function (): void {
    $this->actingAs($user = Personel::factory()->create());
    $this->post(route(name: 'location.store'), ['name' => 'Módulo 4', 'code' => 'M4', 'level' => 1])->assertRedirect(route(name: 'location.index'));
});

test(description: 'Usuario autenticado puede vistualizar una ubicación específica', closure: function (): void {
    $this->actingAs($user = Personel::factory()->create());
    $this->post(route(name: 'location.store'), ['name' => 'Módulo 4', 'code' => 'M4', 'level' => 1]);
    $this->get(route(name: 'location.show', parameters: ['id' => '1']))->assertOk();
});
