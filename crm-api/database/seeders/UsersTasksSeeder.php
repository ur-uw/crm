<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tasks = Task::all();
        User::all()->each(function (User $user) use ($tasks) {
            $user->tasks()->sync(
                $tasks->random(rand(1, 5))->pluck('id')->toArray()
            );
        });
    }
}
