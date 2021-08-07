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
        Task::all()->each(function (Task $task) {
            $owner = User::inRandomOrder()->limit(1)->get()[0];
            $task->users()->sync(
                User::inRandomOrder()->limit(rand(1, 3))->pluck('id'),
            );
            $task->update(['created_by' => $owner->id]);
        });
    }
}
