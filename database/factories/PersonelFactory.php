<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Personel>
 */
class PersonelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "email" => $this->faker->unique()->safeEmail(),
            "username" => $this->faker->unique()->username(),
            "password" => 'password',
            "phone_number" => $this->faker->phoneNumber(),
            "first_name" => $this->faker->firstName(),
            "second_name" => $this->faker->firstName(),
            "last_name" => $this->faker->lastName(),
            "second_last_name" => $this->faker->lastName(),
        ];
    }
}
