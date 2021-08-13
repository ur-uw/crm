<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            LaratrustSeeder::class,
            UserSeeder::class,
            AddressSeeder::class,
            StatusSeeder::class,
            PrioritySeeder::class,
            ProjectUserSeeder::class,
            ProjectTeamsSeeder::class,
            ProjectTasksSeeder::class,
            TeamsUsersSeeder::class,
            // UsersTasksSeeder::class,
            DefaultProjectTeamUserSeeder::class,
        ]);
    }
}
