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
        Team::all()->each(function (Team $team) {
            $team->users()->sync(
                User::inRandomOrder()->limit(rand(1, 3))->pluck('id')->toArray()
            );
        });
    }
}
