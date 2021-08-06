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
        $statuses_count = Status::count();
        Project::all()->each(function (Project $project) use ($statuses_count) {
            $project->tasks()->saveMany(
                Task::factory(rand(1, 3))->make([
                    'created_by' => rand(1, 100),
                    'status_id' => rand(1, $statuses_count)
                ])
            );
        });
    }
}
