<?php

namespace Database\Seeders;

use App\Models\Status;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

class TaskUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statuses = Status::all();
        User::all()->each(function (User $user) use ($statuses) {
            $tasks = Task::factory(20)->make([
                'status_id' => rand(1, count($statuses))
            ]);
            $user->tasks()->saveMany($tasks);
        });
    }
}
