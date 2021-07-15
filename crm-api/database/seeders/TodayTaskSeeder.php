<?php

namespace Database\Seeders;

use App\Models\TodayTask;
use Illuminate\Database\Seeder;

class TodayTaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        TodayTask::factory()->count(3)->create();
    }
}
