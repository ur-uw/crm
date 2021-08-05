<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Status;
use App\Models\Task;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

use function GuzzleHttp\Promise\all;

class ProjectTeamUserTaskSeeder extends Seeder
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
            // create project tasks

            $project_tasks = Task::factory(20)->create(['status_id' => rand(1, $statuses_count)]);

            // Seeding project with tasks
            $project->tasks()->saveMany($project_tasks);

            $project->teams->each(function (Team $team) use ($project_tasks) {
                // Seeding Project's team
                $team->tasks()->saveMany($project_tasks);

                //Seeding Project's Team Users
                $team_users = $team->users;
                if (count($team_users) > 0) {
                    $team->users()->each(function (User $user) use ($project_tasks) {
                        $user->tasks()->saveMany(
                            $project_tasks->random(rand(0, 2)),
                        );
                    });
                }
            });
        });
    }
}
