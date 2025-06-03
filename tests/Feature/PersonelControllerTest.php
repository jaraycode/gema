<?php

namespace Tests\Feature;

use App\Models\Personel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class PersonelControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test of the index method.
     */
    public function test_index()
    {
        $personel = Personel::factory()->create();

        $response = $this->get('/api/personels/');

        $response->assertStatus(200)
            ->assertJson([$personel->toArray()]);
    }

    /**
     * Test of the store method.
     */
    public function test_store()
    {
        $data = [
            'email' => 'test@example.com',
            'username' => 'testuser',
            'password' => 'password',
            'phone_number' => '1234567890',
            'first_name' => 'John',
            'second_name' => 'Doe',
            'last_name' => 'Smith',
            'second_last_name' => 'Johnson',
        ];

        $response = $this->post('/api/personels/', $data);

        $response->assertStatus(201)
            ->assertJsonFragment(['email' => 'test@example.com']);

        $this->assertDatabaseHas('personel', [
            'email' => 'test@example.com',
        ]);
    }

    /**
     * Test of the show method.
     */
    public function test_show()
    {
        $personel = Personel::factory()->create();

        $response = $this->get('/api/personels/' . $personel->id);

        $response->assertStatus(200)
            ->assertJson($personel->toArray());
    }

    /**
     * Test of the update method.
     */
    public function test_update()
    {
        $personel = Personel::factory()->create();

        $data = [
            'email' => 'updated@example.com',
            'username' => 'updateduser',
            'password' => 'newpassword',
            'phone_number' => '0987654321',
            'first_name' => 'Jane',
            'second_name' => 'Doe',
            'last_name' => 'Smith',
            'second_last_name' => 'Johnson',
        ];

        $response = $this->patch('/api/personels/' . $personel->id, $data);

        $response->assertStatus(200);

        $this->assertDatabaseHas('personel', [
            'email' => 'updated@example.com',
        ]);
    }

    /**
     * Test of the destroy method.
     */
    public function test_destroy()
    {
        $personel = Personel::factory()->create();

        $response = $this->delete('/api/personels/' . $personel->id);

        $response->assertStatus(204);

        $this->assertDatabaseMissing('personel', [
            'id' => $personel->id,
        ]);
    }
}
