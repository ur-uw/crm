<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Status;
use App\Models\Task;
use Illuminate\Database\Seeder;

class ProjectTasksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statuses = Status::all();
        Project::all()->each(function (Project $project) use ($statuses) {
            $tasks = Task::factory(rand(5, 10))->make([
                'status_id' => rand(1, count($statuses))
            ]);
            $project->tasks()->saveMany($tasks);
        });
    }
}