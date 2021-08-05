<?php

namespace Tests\Feature;


use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TeamTests extends TestCase
{
    use RefreshDatabase;

    /**
     * Check if teams have tasks based on their users
     *
     * @return void
     */
    public function test_teams_have_tasks_based_on_their_users()
    {
        $this->seed(DatabaseSeeder::class);
        $team = Team::find(1);
        $this->assertNotEmpty($team->tasks());
    }
}
