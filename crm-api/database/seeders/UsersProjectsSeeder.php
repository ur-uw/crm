<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class UsersProjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $projects = Project::all();
        User::all()->each(function (User $user) use ($projects) {
            $user->projects()->sync(
                $projects->random(rand(1, 3))->pluck('id')->toArray()
            );
        });
    }
}
