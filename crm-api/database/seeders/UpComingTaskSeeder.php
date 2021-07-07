<?php

namespace Database\Seeders;

use App\Models\UpComingTask;
use Illuminate\Database\Seeder;

class UpComingTaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UpComingTask::factory()->count(5)->create();
    }
}
