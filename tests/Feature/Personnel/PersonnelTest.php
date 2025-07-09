<?php

use App\Models\personel;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test(description: 'Usuarios sin permiso son redirigidos al login', closure: function (): void {
    $this->get('/personel')->assertRedirect('/login');
});

test(description: 'Usuario autenticado puede vistualizar página principal de personal', closure: function (): void {
    $this->actingAs($user = Personel::factory()->create());
    $this->get(route(name: 'personel.index'))->assertOK();
});

test(description: 'Usuario autenticado puede crear un nuevo personal', closure: function (): void {
    $this->actingAs($user = Personel::factory()->create());
    $personel = Personel::factory()->create();
    $this->post(route(name: 'personel.store'), $personel)->assertRedirect(route(name: 'personel.index'));
});

test(description: 'Usuario autenticado puede vistualizar un personal específico', closure: function (): void {
    $this->actingAs($user = Personel::factory()->create());
    $personel = Personel::factory()->create();
    $this->get(route(name: 'personel.show', parameters: ['id' => $personel->id]))->assertOk();
});

test(description: 'Usuario autenticado puede visualizar página de editar', closure: function (): void {
    $this->actingAs($user = Personel::factory()->create());
    $personel = Personel::factory()->create();
    $this->get(route(name: 'personel.edit', parameters: ['id' => $personel->id]))->assertOk();
});

test(description: 'Usuario autenticado puede actualizar registro de ubicación', closure: function (): void {
    $this->actingAs($user = Personel::factory()->create());
    $personel = Personel::factory()->create();
    $this->put(route(name: 'personel.update', parameters: ['id' => $personel->id]), [
        'email' => 'updated@example.com',
        'username' => 'updateduser',
        'password' => 'newpassword',
        'phone_number' => '0987654321',
        'first_name' => 'Jane',
        'second_name' => 'Doe',
        'last_name' => 'Smith',
        'second_last_name' => 'Johnson',
    ])->assertRedirect(route(name: 'personel.index'));
});
