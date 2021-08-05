<?php

namespace Tests\Feature;

use App\Models\Project;
use App\Models\Status;
use App\Models\Task;
use App\Models\Team;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProjectTeamUserTaskTests extends TestCase
{
    use RefreshDatabase;
    /**
     * Make sure that the created task exists on the:
     * Project
     * Team
     * User
     *
     * @return void
     */
    public function test_ensure_task_created_exists_on_project_team_user()
    {
        // GIVEN
        $user = User::factory()->create();
        $project = Project::factory()->create(['user_id' => $user->id]);
        $team = Team::factory()->create(['project_id' => $project->id]);
        $status = Status::factory()->waiting()->create();
        $task = Task::factory()->create(['status_id' => $status->id]);
        // WHEN
        $user->tasks()->save($task);
        $team->tasks()->save($task);
        $project->tasks()->save($task);
        //THEN
        $this->assertEquals($user->tasks[0]->name, $project->tasks[0]->name);
        $this->assertEquals($user->tasks[0]->name, $team->tasks[0]->name);
        $this->assertEquals($project->tasks[0]->name, $team->tasks[0]->name);
    }
}
