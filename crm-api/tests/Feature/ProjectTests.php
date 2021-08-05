<?php

namespace Tests\Feature;

use App\Models\Project;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Database\Seeders\DatabaseSeeder;

class ProjectTests extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_project_has_tasks_based_on_their_users()
    {
        $this->seed(DatabaseSeeder::class);
        $project = Project::find(1);
        $project_tasks = $project->tasks;
        $this->assertNotEmpty($project_tasks);
    }
}
