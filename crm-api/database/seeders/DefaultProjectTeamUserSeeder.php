<?php

namespace Database\Seeders;

use App\Models\Image;
use App\Models\Permission;
use App\Models\Project;
use App\Models\Role;
use App\Models\Task;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;

class DefaultProjectTeamUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::firstWhere('name', 'Mohammed Fadhil');
        $user2 = User::factory()->create(['name' => 'user 2']);
        $user3 = User::factory()->create(['name' => 'user 3']);
        $user2->images()->save(Image::factory()->make([
            'path' => 'https://picsum.photos/id/1005/200/300'
        ]));
        $user3->images()->save(Image::factory()->make(
            [
                'path' => 'https://picsum.photos/id/1009/200/300'

            ]
        ));

        $project = Project::factory()->create([
            'name' => 'Mohammed project',
            'user_id' => $user->id,
        ]);


        $tasks = Task::factory(4)->create([
            'created_by' => $user->id,
            'project_id' => $project->id,
            'status_id' => rand(1, 4),
            'priority_id' => rand(1, 3),
        ]);
        $user->tasks()->sync($tasks);

        $team_name = "Mohammed Team";
        $mohammedTeam = Team::factory()->create([
            'display_name' => $team_name,
            'project_id' => $project->id,
        ]);
        $mohammedTeam->users()->sync(
            collect([$user, $user2, $user3])->pluck('id')->toArray()
        );

        $otherTeams = Team::factory(4)->create([
            'project_id' => $project->id
        ]);
        $project->teams()->saveMany($otherTeams);
        $otherTeams->each(function (Team $team) {
            $users = User::factory(rand(2, 4))->create();
            $team->users()->sync($users->pluck('id')->toArray());
            $users->each(function (User $user) use ($team) {
                $user->attachPermissions(
                    ['project-update', 'task-read', 'project-read'],
                    $team
                );
                $user->images()->save(Image::factory()->make([
                    'path' => "https://picsum.photos/id/{$user['id']}/200/300"

                ]));
            });
        });
        $user->attachPermissions(Permission::all(), $mohammedTeam);
        $user->attachRole(Role::firstWhere('name', 'owner'), $mohammedTeam);
        $user2->attachPermissions(['project-update', 'project-read', 'task-read', 'task-update']);
        $user3->attachPermissions(['project-read', 'task-read']);
    }
}
