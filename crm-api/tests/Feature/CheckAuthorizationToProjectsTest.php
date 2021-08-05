<?php

namespace Tests\Feature;

use App\Models\Permission;
use App\Models\Project;
use App\Models\Team;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CheckAuthorizationToProjectsTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Check weather a user owns a project.
     *
     * @return void
     */
    public function test_check_if_user_owns_a_project()
    {
        $this->seed(DatabaseSeeder::class);
        $project = Project::factory()->make();
        $user = User::find(1);
        $user->projects()->save($project);
        $result = $user->owns($project);
        $this->assertTrue($result);
    }

    //  * Check weather a specific user has permission to a project or not.
    //  *
    //  * @return void
    //  */
    public function test_check_if_user_has_the_right_permissions_for_a_project()
    {
        // GIVEN
        $this->seed(DatabaseSeeder::class);
        $user = User::find(1);
        $project = Project::find(1);
        // WHEN
        $user->attachPermission('project-update');
        $result = $user->isAbleToAndOwns('project-update', $project);
        // THEN
        $this->assertTrue($result);
    }
    public function test_check_if_user_has_the_right_permissions_for_a_project_with_a_specific_team()
    {
        // GIVEN
        $this->seed(DatabaseSeeder::class);
        $user = User::find(1);
        $team = Team::factory()->make();
        $project = Project::factory()->make();

        $user->projects()->save($project);
        $project->teams()->save($team);
        $team->users()->save($user);
        // WHEN
        $user->attachPermission('project-update', $team);
        $result = $user->hasRole('project-update', $team);
        // THEN
        $this->assertTrue($result);
    }
    public function test_check_if_user_has_the_right_roles_for_a_project_with_a_specific_team()
    {
        // GIVEN
        $this->seed(DatabaseSeeder::class);
        $user = User::find(1);
        $team = Team::factory()->make();
        $project = Project::factory()->make();
        $user->projects()->save($project);
        $project->teams()->save($team);
        $team->users()->save($user);
        // WHEN
        $user->attachRole('owner', $team);
        $result = $user->hasRole('super-admin|owner', $team);
        // THEN
        $this->assertTrue($result);
    }
}
