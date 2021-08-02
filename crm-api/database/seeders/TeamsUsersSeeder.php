<?php

namespace Database\Seeders;

use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class TeamsUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $teams = Team::all();

        User::all()->each(function (User $user) use ($teams) {
            $user->teams()->sync(
                $teams->random(rand(1, 3))->pluck('id')->toArray(),
            );
        });
    }
}