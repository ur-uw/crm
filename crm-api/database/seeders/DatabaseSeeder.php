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
            ImageSeeder::class,
            AddressSeeder::class,
            StatusSeeder::class,
            PrioritySeeder::class,
            TagSeeder::class,
            ProjectUserSeeder::class,
            ProjectTeamsSeeder::class,
            TeamsUsersSeeder::class,
            ProjectTasksSeeder::class,
            DefaultProjectTeamUserSeeder::class,
        ]);
    }
}
