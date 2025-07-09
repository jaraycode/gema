<?php

namespace Tests\Feature;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Personel;
use App\Models\User;
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
        $this->actingAs($user = Personel::factory()->create());
        $personel = Personel::factory()->create();
        // Make the request to the /personel/ route
        $response = $this->get('/personel/');
        // Assert that the response contains the personnel data
        $response->assertJson([$personel->toArray()]);
    }

    /**
     * Test of the store method.
     */
    public function test_store()
    {
        $this->actingAs($user = Personel::factory()->create());
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

        $response = $this->post('/personel/store', $data);

        $response->assertJsonFragment(['email' => 'test@example.com']);

        $this->assertDatabaseHas('personel', [
            'email' => 'test@example.com',
        ]);
    }

    /**
     * Test of the show method.
     */
    public function test_show()
    {
        $this->actingAs($user = Personel::factory()->create());
        $personel = Personel::factory()->create();

        $response = $this->get('/personel/p' . $personel->id);

        $response->assertJson($personel->toArray());
    }

    /**
     * Test of the update method.
     */
    public function test_update()
    {
        $this->actingAs($user = Personel::factory()->create());
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

        $response = $this->patch('/personel/edit/' . $personel->id, $data);

        $this->assertDatabaseHas('personel', [
            'email' => 'updated@example.com',
        ]);
    }

    /**
     * Test of the destroy method.
     */
    public function test_destroy()
    {
        $this->actingAs($user = Personel::factory()->create());
        $personel = Personel::factory()->create();

        $response = $this->delete('/personel/destroy/' . $personel->id);

        $this->assertDatabaseMissing('personel', [
            'id' => $personel->id,
        ]);
    }
}
