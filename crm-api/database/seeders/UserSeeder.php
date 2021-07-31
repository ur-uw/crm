<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $super_admin = User::factory()->super_admin()->create();
        $super_admin->attachRole('super-admin');
        User::factory(100)->create()->each(function (User $user) {
            $user->attachRole('guest');
        });
    }
}