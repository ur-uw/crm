<?php

namespace Database\Seeders;

use App\Models\Status;
use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statues = Status::all();
        foreach ($statues as $status) {
            $status->tasks()->saveMany(Task::factory(random_int(1, 2))->make());
        }
    }
}