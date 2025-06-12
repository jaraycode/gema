<?php

use App\Models\Personel;
use Illuminate\Support\Facades\Hash;

uses(classAndTraits: \Illuminate\Foundation\Testing\RefreshDatabase::class);

test(description: 'Pantalla de login es renderizada', closure: function (): void {
    $response = $this->get('/login');

    $response->assertStatus(200);
});

test('Usuarios pueden autenticarse', closure: function (): void {
    $user = Personel::factory()->create();

    $response = $this->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route(name: 'home', absolute: false));
});

test(description: 'Usuarios no pueden autenticarse con una contraseña incorrecta', closure: function (): void {
    $user = Personel::factory()->create();

    $this->post('/login', [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});

test(description: 'Usuarios pueden salir de la sesión', closure: function (): void {
    $user = Personel::factory()->create();

    $response = $this->actingAs($user)->post('/logout');

    $this->assertGuest();
    $response->assertRedirect('/');
});
