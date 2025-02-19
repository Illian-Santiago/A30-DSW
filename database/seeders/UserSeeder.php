<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create(
            [
                'name' => 'usuario',
                'email' => 'usuario@usuario.com',
                'password' => 'Usuario123',
            ]
        );

        User::factory()->create(
            [
                'name' => 'admin',
                'email' => 'admin@admin.com',
                'password' => 'Admin123',
            ]
        );
    }
}
