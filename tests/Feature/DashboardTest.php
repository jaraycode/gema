<?php

use App\Models\Personel;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test(description: 'Usuarios sin permiso son redirigidos al login', closure: function (): void {
    $this->get('/')->assertRedirect('/login');
});

test(description: 'Usuarios autenticados pueden entrar al dashboard', closure: function (): void {
    $this->actingAs($user = Personel::factory()->create());

    $this->get('/')->assertOk();
});
